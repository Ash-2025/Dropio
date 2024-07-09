import Button from "./components/Button"
import FileUpload from "./components/FileUpload"
import { GetFile } from "./components/GetFile"
import { Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from '../src/components/Home'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route exact path="/" element={<Home />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/download" element={<GetFile />} />
      </Route>
    </Routes>
  )
}
// bg-gradient-to-br from-red-500 to-amber-500 bg-clip-text text-transparent
export default App

{/* <div className="bg-slate-500 w-auto p-4 rounded-lg">
      <Link to={"/upload"} className="text-lg text-sky-500">
        Upload
      </Link>
      
    </div>
    <div className="bg-slate-500 w-auto p-4 rounded-lg">
      <Link to={"/download"} className="text-lg text-sky-500">
        download
      </Link>
    </div> */}
