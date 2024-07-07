import { JSDOM } from 'jsdom'
import fs from 'fs'

const readMetadata = () => {
  try {
    return JSON.parse(fs.readFileSync('data/metadata.json', 'utf8'))
  }
  catch {
    return {}
  }
}

const saveMetadata = (metadata: any) => {
  fs.writeFileSync('data/metadata.json', JSON.stringify(metadata, null, 2))
}

const fetchTifFile = async (url: string): Promise<ArrayBuffer> => {
  console.log(`Fetching .tif file from ${url}...`)
  const response = await fetch(url)
  const data = await response.arrayBuffer()
  return data
}

const fetchData = async () => {
  // https://hub.worldpop.org/ajax/geolisting/category?id=77&_=1720366291248
  const metadata = {
    fetchedIds: [],
    ...readMetadata(),
  }

  console.log('Fetching data...')
  const entriesRes = await fetch('https://hub.worldpop.org/ajax/geolisting/category?id=77')
  const entries = await entriesRes.json()

  console.log(entries.length + ' entries found')

  for (const entry of entries) {
    if (metadata.fetchedIds.includes(entry.id))
      continue

    const id = entry.id

    console.log(`Fetching data for ${entry.country} / ${entry.popyear} (id: ${id})...`)
    const summaryReq = await fetch('https://hub.worldpop.org/geodata/summary?id=' + id)
    const summaryRes = await summaryReq.text()

    const dom = new JSDOM(summaryRes)
    const link = dom.window.document.querySelector('a[href$=".tif"]')?.href
    
    if (!link) {
      console.log(`No entry found for ${entry.country} / ${entry.popyear} (id: ${id})`)
      continue
    }

    const data = await fetchTifFile(link)
    fs.writeFileSync(`data/files/${entry.country}_${entry.popyear}.tif`, Buffer.from(data))

    metadata.fetchedIds.push(id)
    saveMetadata(metadata)
  }

  // saveToFile(entries)
}

fetchData()
