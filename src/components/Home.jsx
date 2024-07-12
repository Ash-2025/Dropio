
import { Link } from 'react-router-dom'
import { ReactTyped } from 'react-typed'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUpload,faDownload} from '@fortawesome/free-solid-svg-icons'
export default function Home() {

    

    return (
        <>
            <main className="flex flex-col md:flex-row justify-between h-svh md:h-[90vh] bg-slate-900 text-white text-center overscroll-none">
                <section className="h-full w-full md:w-1/2 flex flex-col justify-start pt-4 gap-8 items-start">

                    <h1 className=" text-[5rem] md:text-[6rem] font-inter pl-2 font-extrabold bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
                        DROPIO
                    </h1>
                    <span className="text-[2.6rem] md:text-[3rem] font-bold font-roboto text-left pl-2">
                        FILE SHARING MADE SIMPLE
                    </span>

                    <ReactTyped strings={['Skip Authentication', 'Easy to use Interface','Preview Files']} typeSpeed={70} backDelay={5000} backSpeed={60} loop={true}
                        className='text-[1.6rem] md:text-[2.6rem] font-roboto font-bold text-amber-500 pl-2'>

                    </ReactTyped>

                    <div className='w-full h-auto flex flex-col gap-2 md:flex-row justify-evenly md:gap-6 p-4 mx-auto md:justify-start'>

                        <Link to={"/upload"} className='max-w-fit flex gap-2 items-center bg-purple-600 p-2 rounded-lg'>
                            <span className='font-inter font-bold text-[1.1rem] md:text-[2rem]'>Upload File</span>
                            <FontAwesomeIcon size='2x' icon={faUpload} />
                        </Link>

                        <Link to={"/download"} className='max-w-fit flex items-center gap-2 bg-emerald-500 p-2 rounded-lg'>
                            <span className='font-inter font-bold text-[1.1rem] md:text-[2rem]'>Download File</span>
                            <FontAwesomeIcon size='2x' icon={faDownload} />

                        </Link>
                    </div>
                </section>

                <section className='h-full w-full md:w-1/2 flex items-center'>
                    <div className="grid grid-cols-4 md:grid-cols-2 p-4 h-3/4">
                        <div className="w-full h-1/2">
                            <img src="imgs/pdf.png" alt="Image 1" className="w-full h-full object-contain rounded-lg mix-blend-screen" />
                        </div>
                        <div className="w-full h-1/2">
                            <img src="imgs/xlsx.png" alt="Image 2" className="w-full h-full object-contain mix-blend-screen rounded-lg" />
                        </div>
                        <div className="w-full h-1/2">
                            <img src="imgs/ppt.png" alt="Image 2" className="w-full h-full object-contain mix-blend-screen rounded-lg" />
                        </div>
                        <div className="w-full h-1/2">
                            <img src="imgs/jpg.png" alt="Image 2" className="w-full h-full object-contain mix-blend-screen rounded-lg" />
                        </div>
                        
                    </div>
                </section>
            </main>
        </>
    )
}