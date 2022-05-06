// import { useState, createContext } from 'react';
// import { otherStuff } from '../data/fileThatCouldHoldVariables';
// import { french, english } from '../data/languages';

// export const LanguageContext = createContext();

// export const LanguageProvider = props => {
//     const [language, setLanguage] = useState('english');

//     return (
//         <LanguageContext.Provider
//             value={{ language, setLanguage, french, english }}
//         >
//             {props.children}
//         </LanguageContext.Provider>
//     )
// }

// // we use a wrapper component to house state or information from the database
// // in this, french and english are objects that have keys for all the sections / words
// // and values for what the english or french word would be.
// // language, setLanguage lets us change and read language from any part of the code.


// // ----------------------
// // in index.js main file

// ...
// import { LanguageProvider } from './context/LanguageContext'

// const Root = () => {
//     return (
//         <LanguageContext.Provider>
//             <App />
//         </LanguageContext.Provider>
//     )
// }

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// )



// // ----------------------
// // in other files

// import {useContext} from 'react'

// Component () {
//     const { destructure all the things you want, language, setLanguage, french, english } = useContext(
//         LanguageContext
//     )

//     return (
//         stuff
//     )
// }