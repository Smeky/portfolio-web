
export default function Homepage() {
  return (
    <main>
      <div className='w-screen h-[95vh] grid place-items-center box-content'>
        <div>
          <h1 className='text-3xl font-bold text-primary'>
            Hi! 👋<br/>
            my name is <span className='text-blue-500'>Tom</span>
          </h1>
          <p className='mt-1 ml-16 text-gray-500'>Senior Front-end developer from Pilsen</p>
        </div>
      </div>
    </main>
  );
}
