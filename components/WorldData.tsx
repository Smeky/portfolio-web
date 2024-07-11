'use client'

import WorldDataApp from '@/3d/WorldDataApp'
import { useEffect, useRef, useState } from 'react'

import * as Geotif from 'geotiff'

interface WorldDataProps {

}

const getGeotifMetadata = (geoimage: Geotif.GeoTIFFImage) => {
  return {
    width: geoimage.getWidth(),
    height: geoimage.getHeight(),
    tileWidth: geoimage.getTileWidth(),
    tileHeight: geoimage.getTileHeight(),
    samplesPerPixel: geoimage.getSamplesPerPixel(),
    origin: geoimage.getOrigin(),
    resolution: geoimage.getResolution(),
    bbox: geoimage.getBoundingBox(),
  }
}

type GeoImageData = {
  data: number[],
  width: number,
  height: number,
  origin: number[],
  name?: string,
}

const getGeoimageData = async (geoImage: Geotif.GeoTIFFImage, factor: number): Promise<GeoImageData> => {
  const width = geoImage.getWidth()
  const height = geoImage.getHeight()

  const newWidth = Math.floor(width / factor)
  const newHeight = Math.floor(height / factor)
  const array = await geoImage.readRasters()
  const data = array[0]
  const resizedData = new Float32Array(newWidth * newHeight)

  console.log('Resizing', geoImage.fileName)

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const srcX = Math.floor(x * factor)
      const srcY = Math.floor(y * factor)
      const srcIndex = srcY * width + srcX
      const dstIndex = y * newWidth + x
      resizedData[dstIndex] = (data as Float32Array)[srcIndex]
    }
  }

  return {
    data: Array.from(resizedData),
    width: newWidth,
    height: newHeight,
    origin: geoImage.getOrigin(),
    name: geoImage.fileName,
  }
}

const mergeGeoImageDatas = (geoDatas: GeoImageData[]): GeoImageData => {
  if (geoDatas.length === 0) {
    throw new Error("No geo data to merge");
  }

  // const minX = Math.min(...geoDatas.map(data => data.origin[0]));
  // const minY = Math.min(...geoDatas.map(data => data.origin[1]));
  // const maxX = Math.max(...geoDatas.map(data => data.origin[0] + data.width));
  // const maxY = Math.max(...geoDatas.map(data => data.origin[1] + data.height));

  const mergedWidth = Math.floor(geoDatas.reduce((acc, { width }) => acc + width, 0))
  const mergedHeight = Math.max(...geoDatas.map(({ height }) => height))
  const mergedData = new Float32Array(mergedWidth * mergedHeight)

  console.log('Mergin geodata...', geoDatas.length, mergedWidth, mergedHeight)

  let offsetX = 0

  geoDatas.forEach(({ name, data, width, height, origin }) => {
    console.log(name, width, height, origin)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const srcIndex = y * width + x;
        const dstIndex = y * mergedWidth + offsetX + x;
        mergedData[dstIndex] = data[srcIndex];
      }
    }

    offsetX += width
  })

  return {
    data: Array.from(mergedData),
    width: mergedWidth,
    height: mergedHeight,
    origin: [0, 0],
  };
}

const getCanvasImageFromGeoData = (geoData: GeoImageData): string | undefined => {
  const { data, width, height } = geoData
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (ctx === null) return

  canvas.width = width
  canvas.height = height

  const imageData = ctx.createImageData(width, height)

  for (let i = 0; i < data.length; i++) {
    const value = data[i]
    imageData.data[i * 4] = value
    imageData.data[i * 4 + 1] = value
    imageData.data[i * 4 + 2] = value
    imageData.data[i * 4 + 3] = 255
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL()
}

export default function WorldData({ }: Readonly<WorldDataProps>): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<WorldDataApp | null>(null)
  const [image, setImage] = useState<string | null>(null)

  // useEffect(() => {(offsetX + x)
  //   if (containerRef.current === null) return

  //   const app = new WorldDataApp({ container: containerRef.current })
  //   appRef.current = app

  //   app.init().then(() => app.start())

  //   return () => app.destroy()
  // }, [containerRef])

  useEffect(() => {
    if (image !== null) return

    const loadImage = async () => {
      // const paths = [
      //   "Afghanistan_2020.tif",
      //   "Albania_2020.tif",
      //   "Algeria_2010.tif",
      //   "Algeria_2020.tif",
      //   "American Samoa_2020.tif",
      //   "Andorra_2020.tif",
      //   "Angola_2020.tif",
      //   "Anguilla_2020.tif",
      //   "Antigua and Barbuda_2020.tif",
      //   "Argentina_2020.tif",
      //   "Armenia_2020.tif",
      //   "Aruba_2020.tif",
      //   "Australia_2020.tif",
      //   "Austria_2020.tif",
      //   "Azerbaijan_2020.tif",
      //   "Bahamas_2020.tif",
      //   "Bahrain_2020.tif",
      //   "Bangladesh_2020.tif",
      //   "Barbados_2020.tif",
      //   "Belarus_2020.tif",
      //   "Belgium_2020.tif",
      //   "Belize_2020.tif",
      //   "Benin_2020.tif",
      //   "Bermuda_2020.tif",
      //   "Bhutan_2020.tif",
      //   "Bolivia_2020.tif",
      //   "Bonaire, Sint Eustatius and Saba_2020.tif",
      //   "Bosnia and Herzegovina_2020.tif",
      //   "Botswana_2020.tif",
      //   "Brazil_2020.tif",
      //   "British Virgin Islands_2020.tif",
      //   "Brunei Darussalam_2020.tif",
      //   "Bulgaria_2020.tif",
      //   "Burkina Faso_2020.tif",
      //   "Burundi_2020.tif",
      //   "Cambodia_2020.tif",
      //   "Cameroon_2020.tif",
      //   "Canada_2020.tif",
      //   "Cape Verde_2020.tif",
      //   "Cayman Islands_2020.tif",
      //   "Central African Republic_2020.tif",
      //   "Chad_2020.tif",
      //   "Chile_2020.tif",
      //   "China_2020.tif",
      //   "Colombia_2020.tif",
      //   "Comoros_2020.tif",
      //   "Cook Islands_2020.tif",
      //   "Costa Rica_2020.tif",
      //   "Cote d'Ivoire_2020.tif",
      //   "Croatia_2020.tif",
      //   "Cuba_2020.tif",
      //   "Curaçao_2020.tif",
      //   "Cyprus_2020.tif",
      //   "Czech Republic_2020.tif",
      //   "Denmark_2020.tif",
      //   "Djibouti_2020.tif",
      //   "Dominica_2020.tif",
      //   "Dominican Republic_2020.tif",
      //   "DRC_2020.tif",
      //   "Ecuador_2020.tif",
      //   "Egypt_2020.tif",
      //   "El Salvador_2020.tif",
      //   "Equatorial Guinea_2020.tif",
      //   "Eritrea_2020.tif",
      //   "Estonia_2020.tif",
      //   "Eswatini_2020.tif",
      //   "Ethiopia_2020.tif",
      //   "Falkland Islands (Malvinas)_2020.tif",
      //   "Faroe Islands_2020.tif",
      //   "Fiji_2020.tif",
      //   "Finland_2020.tif",
      //   "France_2020.tif",
      //   "French Guiana_2020.tif",
      //   "French Polynesia_2020.tif",
      //   "Gabon_2020.tif",
      //   "Gambia_2020.tif",
      //   "Georgia_2020.tif",
      //   "Germany_2020.tif",
      //   "Ghana_2020.tif",
      //   "Gibraltar_2020.tif",
      //   "Greece_2020.tif",
      //   "Greenland_2020.tif",
      //   "Grenada_2020.tif",
      //   "Guadeloupe_2020.tif",
      //   "Guam_2020.tif",
      //   "Guatemala_2020.tif",
      //   "Guinea_2020.tif",
      //   "Guinea-Bissau_2020.tif",
      //   "Guyana_2020.tif",
      //   "Haiti_2020.tif",
      //   "Holy See (Vatican City State)_2020.tif",
      //   "Honduras_2020.tif",
      //   "Hong Kong_2020.tif",
      //   "Hungary_2020.tif",
      //   "Iceland_2020.tif",
      //   "India_2020.tif",
      //   "Indonesia_2020.tif",
      //   "Iran_2020.tif",
      //   "Iraq_2020.tif",
      //   "Ireland_2020.tif",
      //   "Isle of Man_2020.tif",
      //   "Israel_2020.tif",
      //   "Italy_2020.tif",
      //   "Jamaica_2020.tif",
      //   "Japan_2020.tif",
      //   "Jordan_2020.tif",
      //   "Kazakhstan_2020.tif",
      //   "Kenya_2020.tif",
      //   "Kiribati_2020.tif",
      //   "Kuwait_2020.tif",
      //   "Kyrgyz Republic_2020.tif",
      //   "Lao People's Democratic Republic_2020.tif",
      //   "Latvia_2020.tif",
      //   "Lebanon_2020.tif",
      //   "Lesotho_2020.tif",
      //   "Liberia_2020.tif",
      //   "Libya_2020.tif",
      //   "Liechtenstein_2020.tif",
      //   "Lithuania_2020.tif",
      //   "Luxembourg_2020.tif",
      //   "Macao_2020.tif",
      //   "Macedonia_2020.tif",
      //   "Madagascar_2020.tif",
      //   "Malawi_2020.tif",
      //   "Malaysia_2020.tif",
      //   "Maldives_2020.tif",
      //   "Mali_2020.tif",
      //   "Malta_2020.tif",
      //   "Marshall Islands_2020.tif",
      //   "Martinique_2020.tif",
      //   "Mauritania_2020.tif",
      //   "Mauritius_2020.tif",
      //   "Mayotte_2020.tif",
      //   "Mexico_2020.tif",
      //   "Micronesia_2020.tif",
      //   "Moldova_2020.tif",
      //   "Monaco_2020.tif",
      //   "Mongolia_2020.tif",
      //   "Montenegro_2020.tif",
      //   "Montserrat_2020.tif",
      //   "Morocco_2020.tif",
      //   "Mozambique_2020.tif",
      //   "Myanmar_2020.tif",
      //   "Namibia_2020.tif",
      //   "Nauru_2020.tif",
      //   "Nepal_2020.tif",
      //   "Netherlands_2020.tif",
      //   "New Caledonia_2020.tif",
      //   "New Zealand_2020.tif",
      //   "Nicaragua_2020.tif",
      //   "Niger_2020.tif",
      //   "Nigeria_2020.tif",
      //   "Niue_2020.tif",
      //   "Northern Mariana Islands_2020.tif",
      //   "North Korea_2020.tif",
      //   "Norway_2020.tif",
      //   "Oman_2020.tif",
      //   "Pakistan_2020.tif",
      //   "Palau_2020.tif",
      //   "Palestinian Territory_2020.tif",
      //   "Panama_2020.tif",
      //   "Papua New Guinea_2020.tif",
      //   "Paraguay_2020.tif",
      //   "Peru_2020.tif",
      //   "Philippines_2020.tif",
      //   "Poland_2020.tif",
      //   "Portugal_2020.tif",
      //   "Puerto Rico_2020.tif",
      //   "Qatar_2020.tif",
      //   "Rep. Congo_2020.tif",
      //   "Réunion_2020.tif",
      //   "Romania_2020.tif",
      //   "Russian Federation_2020.tif",
      //   "Rwanda_2020.tif",
      //   "Saint Barthélemy_2020.tif",
      //   "Saint Helena, Ascension and Tristan da Cunha_2020.tif",
      //   "Saint Kitts and Nevis_2020.tif",
      //   "Saint Lucia_2020.tif",
      //   "Saint Martin_2020.tif",
      //   "Saint Pierre and Miquelon_2020.tif",
      //   "Saint Vincent and the Grenadines_2020.tif",
      //   "Samoa_2020.tif",
      //   "San Marino_2020.tif",
      //   "Sao Tome and Principe_2020.tif",
      //   "Saudi Arabia_2020.tif",
      //   "Senegal_2020.tif",
      //   "Serbia_2020.tif",
      //   "Seychelles_2020.tif",
      //   "Sierra Leone_2020.tif",
      //   "Singapore_2020.tif",
      //   "Sint Maarten (Dutch part)_2020.tif",
      //   "Slovakia (Slovak Republic)_2020.tif",
      //   "Slovenia_2020.tif",
      //   "Solomon Islands_2020.tif",
      //   "Somalia_2020.tif",
      //   "South Africa_2020.tif",
      //   "South Korea_2020.tif",
      //   "South Sudan_2020.tif",
      //   "Spain_2020.tif",
      //   "Sri Lanka_2020.tif",
      //   "Sudan_2020.tif",
      //   "Suriname_2020.tif",
      //   "Sweden_2020.tif",
      //   "Switzerland_2020.tif",
      //   "Syrian Arab Republic_2020.tif",
      //   "Taiwan_2020.tif",
      //   "Tajikistan_2020.tif",
      //   "Tanzania_2020.tif",
      //   "Thailand_2020.tif",
      //   "Timor-Leste_2020.tif",
      //   "Togo_2020.tif",
      //   "Tokelau_2020.tif",
      //   "Tonga_2020.tif",
      //   "Trinidad and Tobago_2020.tif",
      //   "Tunisia_2020.tif",
      //   "Turkiye_2020.tif",
      //   "Turkmenistan_2020.tif",
      //   "Turks and Caicos Islands_2020.tif",
      //   "Tuvalu_2020.tif",
      //   "Uganda_2020.tif",
      //   "Ukraine_2020.tif",
      //   "United Arab Emirates_2020.tif",
      //   "United Kingdom of Great Britain & Northern Ireland_2020.tif",
      //   "United States of America_2020.tif",
      //   "United States Virgin Islands_2020.tif",
      //   "Uruguay_2020.tif",
      //   "Uzbekistan_2020.tif",
      //   "Vanuatu_2020.tif",
      //   "Venezuela_2020.tif",
      //   "Vietnam_2020.tif",
      //   "Wallis and Futuna_2020.tif",
      //   "Western Sahara_2020.tif",
      //   "Yemen_2020.tif",
      //   "Zambia_2020.tif",
      //   "Zimbabwe_2020.tif",
      //   ].sort()

      const paths = ["Afghanistan_2020.tif"]
      
      const geoImages = await Promise.all(paths.map(async path => {
        const file = await Geotif.fromUrl(`/${path}`)
        const image = await file.getImage()

        image.fileName = path // Hacky way to store the file name
        
        return image
      }))
      const geoDatas = await Promise.all(geoImages.map(geoImage => getGeoimageData(geoImage, 10)))
      const geoData = mergeGeoImageDatas(geoDatas)

      // const geoImage = await tiff.getImage()
      // const geoData = await getGeoimageData(geoImage, 10)

      setImage(getCanvasImageFromGeoData(geoData) ?? null)
    }

    loadImage()
  }, [])

  useEffect(() => {
    if (module.hot) {
      module.hot.accept('@/3d/WorldDataApp', () => {
        appRef.current?.destroy()
        const WorldDataApp = require('@/3d/WorldDataApp').default
        const app = new WorldDataApp({ container: containerRef.current as HTMLDivElement })
        appRef.current = app
        app.init().then(() => app.start())
      })
    }
  }, [])

  return (
    <div ref={containerRef} className='w-screen h-screen'>
      <img src={image} className='absolute z-20 top-0 left-0 pointer-events-none select-none' />
    </div>
  )
}
