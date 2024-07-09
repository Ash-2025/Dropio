import React, { useState } from 'react'
import { supabase } from '../../utils/SupabaseConfig'
import Loader from "./Loader";
import DocViewer from './DocViewer';
import {getExtension} from '../../utils/RandomId'
export const GetFile = () => {

  const [secretID, setsecretID] = useState('')
  const [res, setres] = useState(null);
  const [fetch, setfetch] = useState(false);
  const [copy, setcopy] = useState(false);
  const getLink = async () => {
    try {
      setfetch(true);
      const { data, error } = await supabase
        .from('dropioDB')
        .select('*')
        .eq('file_id', secretID);

      if (error) {
        throw error; // This will be caught in the catch block
      }

      if (data && data.length > 0) {
        console.log(data[0]?.id);
        console.log(data[0]?.file_id);
        console.log(data[0]?.file_path);
        console.log(data[0]?.file_url);
        setres(data[0]?.file_url);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setfetch(false);
    }

  }

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setsecretID(e.target.value);
  }

  function clipboard() {
    navigator.clipboard.writeText(res);
    setcopy(true);
  }

  return (
    <>
      <div className="w-full h-[90vh] p-5 bg-gradient-to-br from-slate-800 to-violet-700 flex flex-col md:flex-row justify-center gap-2 ">

        <div className='h-auto mb-5 w-full flex flex-col gap-6'>
          <span className='font-bold text-2xl text-white font-inter'>
            Enter key and get Download Link
          </span>

          <div className='w-full h-1/4 md:h-full flex flex-col md:flex-col sm:flex-row gap-6'>
            <input className='h-10  max-w-max rounded-xl p-4 border-0 focus:outline-none text-lg' type="text" name="text" id="idText"
              value={secretID}
              onChange={handleInputChange}

            />

            {
              fetch && <Loader />
            }

            <div className='w-full h-auto flex flex-wrap gap-2'>
              <button onClick={getLink} className='bg-black max-w-fit md:w-fit border-2 h-10 border-white w-1/2 px-4 rounded-lg text-center text-white font-inter text-[1.5rem] tracking-wide'>
                Link
              </button>


              <a href={res} target='_blank' className='bg-black border-2 h-10 border-white max-w-max px-4 rounded-lg text-center text-white font-inter text-[1.5rem] tracking-wide'>
                <button>
                  download
                </button>
              </a>

              {
                res && <a className='bg-black border-2 h-10 border-white max-w-max px-4 rounded-lg text-center text-white font-inter text-[1.5rem] tracking-wide' onClick={clipboard}>
                  <button>
                    {
                      copy ? 'Copied':'Copy link'
                    }
                  </button>
                </a>
              }
            </div>



          </div>

        </div>

        <div className='w-full h-3/4 md:h-full md:flex flex-col text-center justify-start overflow-hidden pb-4'>
          <h1 className='text-white font-roboto font-bold text-[2rem]'>
            Document Viewer
          </h1>
          <span className='font-inter text-white text-lg'>
            {
              res ? res.substring(res.lastIndexOf('/')+1) : '' 
            }
          </span>
          <DocViewer
            url={res}
            styles='w-full h-full md:h-full flex items-start md:mt-5 justify-center font-bold text-[1.5rem] md:text-[3rem] text-white'
            extension={getExtension(res?res:'')}
          />

        </div>
      </div>

      {/* <code className='text-white text-ellipsis break-words w-full h-auto font-poppins text-lg px-2'>
              {res}
            </code> */}
    </>
  )
}
