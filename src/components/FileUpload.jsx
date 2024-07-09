
import { createClient } from "@supabase/supabase-js"
import { useState } from "react";
import Button from "./Button";

import { RandomId, ToMegabyte } from "../../utils/RandomId";
import Loader from "./Loader";
import {supabase} from '../../utils/SupabaseConfig'


const FileUpload = () => {
    const [uploadfile, setuploadfile] = useState(null);
    const [progress, setprogress] = useState(false);
    const [message, setmessage] = useState('');
    const Fileupload = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setuploadfile(file);
    }
    let extension = uploadfile?.name.substring(uploadfile?.name.lastIndexOf('.') + 1);
    console.log(extension);

    const upload = async () => {
        try {
            setprogress(true);
            const { data, error } = await supabase.storage.from('dropio').upload(`/PDFs/${uploadfile.name}`, uploadfile);

            if (error) {
                setmessage("An Error occurred while uploading")
                console.log(error);
            }
            console.log(data);
            setmessage("File uploaded successfully")
        } catch (error) {
            console.log(error);
        } finally {
            setprogress(false);
        }
       
        console.log(supabase.storage.from('dropio').getPublicUrl(`/PDFs/${uploadfile.name}`))

        //create record to insert in the database
        let Randid = RandomId();
        const record = {
            created_at: new Date().toISOString().split('T')[0],
            file_url: supabase.storage.from('dropio').getPublicUrl(`/PDFs/${uploadfile.name}`).data.publicUrl,
            file_path: `/PDFs/${uploadfile.name}`,
            file_id: Randid
        }
        const { data, error } = await supabase.from("dropioDB").insert([record]);

        if (error) {
            console.log(`Entry error - ${error.details}`);
        }
        console.log(`Entry data - ${data}`);
        setmessage(`${Randid}`);
    }
    return (
        <>
            <main className="w-full h-[90vh] bg-purple-500 p-2">
                <section className="w-3/4 mx-auto h-full flex flex-col gap-8">
                    <div className=" w-full h-auto flex gap-4 flex-col md:flex-row">
                        <div className="w-full max-h-fit p-2 flex justify-center items-center object-contain">
                            <img src="assets/file.png" className="mix-blend-screen h-20 w-20 md:h-1/2 md:w-auto" alt="" />
                        </div>

                        <div className="w-full h-full flex flex-col">
                            <h1 className="text-center font-poppins text-[1.5rem] md:text-[3rem] font-bold md:font-extrabold pb-4 md:pb-0 pt-8 md:text-left">
                                File Details
                            </h1>
                            <div className="w-full flex-grow flex flex-col md:justify-center md:items-start gap-2 md:gap-4">
                            {
                                uploadfile ? (
                                    <>
                                    <span className="text-xl md:text-[2rem] text-white"><b>File Name : </b>{uploadfile?.name}</span>
                                    <br />
                                    <span className="text-xl md:text-[2rem] text-white text-wrap"><b>File Type :</b> {extension}</span>
                                    <br />
                                    <span className="text-xl md:text-[2rem] text-white"><b>File Size : </b>{ToMegabyte(uploadfile.size)}MB</span>
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-purple-300 flex items-center justify-center rounded-lg text-wrap">
                                        <h1 className="font-inter font-bold text-[2rem] text-center">
                                        Select File to see Details
                                    </h1>
                                    </div>
                                )

                            }
                            </div>
                        </div>
                        
                    </div>
                    <div className="w-full h-auto flex flex-wrap gap-2 justify-start sm:justify-center py-2">
                            <Button name={"Select File"} handleClick={Fileupload} />
                            <Button name={"Clear"} handleClick={()=>setuploadfile(null)}/>
                            {
                                uploadfile ? (
                                        <>
                                            <Button
                                                name="Submit"
                                                handleClick={upload}
                                            />
                                        </>
                                ) :
                                (
                                    <>
                                        <Button
                                        name="Submit"
                                        isDisabled={true}
                                        />
                                    </>
                                )
                            }
                            {
                                progress && <Loader/>
                            }
                            
                        </div>
                        {
                            message && <div className="text-[1.2rem] text-center font-bold font-inter text-purple-100">
                            Your File is uploaded with secretID - <span className="text-black">{message}</span>
                        </div>
                        }
                </section>
                <input
                       type="file"
                       id="fileInput"
                         style={{ display: 'none' }}
                       onChange={handleFileChange}
                   />

                
            </main>
        </>
    )
}
export default FileUpload





{/* <div className="flex gap-4 p-4">
                            <Button
                                name="Browse Computer"
                                handleClick={Fileupload}
                            />

                            {uploadfile ? (
                                <Button
                                    name="Submit"
                                    handleClick={upload}
                                />
                            )
                                :
                                (
                                    <Button
                                        name="Submit"
                                        isDisabled={true}
                                    />
                                )}
                        </div> */}





            //             <div className="w-full h-[90vh] p-5 bg-gradient-to-br from-slate-800 to-violet-700 flex justify-center items-center">
            //     <div className="w-3/4 h-3/4 mx-auto my-auto rounded-xl flex flex-col items-center gap-4">

            //         <div className="w-3/4 h-3/4 my-auto flex flex-col md:flex-row md:justify-center md:items-center">
            //             <div className="w-full md:w-1/5 h-full object-cover flex items-center justify-start">

            //                 <img src="assets/file.png" height="150" width="150" alt="" className="mix-blend-screen my-auto md:object-cover" />

            //             </div>

            //             <div className=" w-full md:w-2/3 h-full flex flex-col my-auto items-start justify-start md:justify-center md:items-start md:pl-20 font-inter gap-2 px-1 text-[1.4rem] md:text-[2.5rem] ">
            //                 <span className=" lg:text-[3rem] font-bold text-black">File Details</span>
            //                 {
            //                     uploadfile &&
            //                     <>
            //                         <span className="text-xl text-white"><b>File Name : </b>{uploadfile?.name}</span>
            //                         <span className="text-xl text-white text-wrap"><b>File Type :</b> {extension}</span>
            //                         <span className="text-xl text-white"><b>File Size : </b>{ToMegabyte(uploadfile.size)}MB</span>
            //                     </>
            //                 }
            //             </div>
            //         </div>

            //         <div className="flex flex-col sm:mt-[1rem] md:mt-0 md:pr-20 md:flex-row gap-4 w-3/4 h-1/6 justify-center items-start mb-4">
            //             <Button name="Clear" handleClick={()=>setuploadfile(null)} />
                        
            //             <Button
            //                 name="Select file"
            //                 handleClick={Fileupload}
            //             />

            //             {uploadfile && ToMegabyte(uploadfile.size) < 5 ? (
            //                 <Button
            //                     name="Submit"
            //                     handleClick={upload}
            //                 />
            //             )
            //                 :
            //                 (
            //                     <Button
            //                         name="Submit"
            //                         isDisabled={true}
            //                     />
            //                 )
            //             }

            //         </div>

            //         <input
            //             type="file"
            //             id="fileInput"
            //             style={{ display: 'none' }}
            //             onChange={handleFileChange}
            //         />



            //         {
            //             progress ? (
            //                 <>
            //                     <Loader />
            //                 </>
            //             ) : (
            //                 <>
            //                 </>
            //             )
            //         }
            //         {message &&
            //             <div className="text-[1.2rem] text-left font-bold font-inter text-amber-400 mb-4">
            //                 Your file has been uploaded with secretID - {message}
            //             </div>
            //         }
            //     </div>
            // </div>