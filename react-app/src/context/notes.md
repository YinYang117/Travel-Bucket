inside src, make context folder
file references what type of file were about to create
import from react createContext

invoke it, save to variable
export variable

ie
import {createContext} fron "react";

export const LanguageContext = createContext();

then in index.js, or main <App /> component, wrap it around app

import {LanguageContext} from "./context/"  or whatever your path is

<React.StrictMode>
    <LanguageContext.Provider value={{
        language: "english"
    }}>
        <App />
     </LanguageContext.Provider>
</React.StrictMode>
document.getElementById('root')

.Provider expects a value prop. Specifically value