import logo from './logo.svg'
import './app.css'
import { Bookmarks } from './components/Bookmarks'
import { AddBookmark } from './components/AddBookmark'

function App() {

  return (
    <div>
      <h1 className={`text-2xl text-center font-bold text-zinc-700`}>Hello, my name is Craig and this is my app</h1>  

      <Bookmarks />
      {/* <AddBookmark /> */}
    </div>
  )
}

export default App
