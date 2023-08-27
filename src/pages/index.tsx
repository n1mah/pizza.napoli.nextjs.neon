import Image from 'next/image'

export default function Home() {
  return (
    <main className='max-w-sm mx-auto bg-pink-700'>
      <h1 className='text-center font-bold text-5xl'>Pizza Napoli</h1>
      <h2 className='text-center font-bold text-3xl'>Menu</h2>
      <div className='flex flex-col'>
        <div className='flex flex-col bg-blue-600 w-10/12 mx-auto'>
          <h3>pizza 1</h3>
          <span>200$</span>
          <div className='flex justify-center items-center'>
            <div className='flex justify-center items-center'>
              {/*<button className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>x</button>*/}
              <button className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>-</button>
              <span className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white mx-2 rounded-full'>0</span>
              <button className='w-6 h-6 flex justify-center items-center bg-slate-700 text-white rounded-full'>+</button>
            </div>
            <h3 className='mx-2'>تعداد</h3>

          </div>
        </div>
      </div>
    </main>
  )
}
