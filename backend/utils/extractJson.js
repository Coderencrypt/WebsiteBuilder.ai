
// const extractJson = async (raw) => {
//     if(!text){
//         return 
//     } 
//     const cleaned  = text.
//     replace(/```json/gi, "")
//     .replace(/```/g, "").trim();

//     const firstBarce= cleaned.indexOf('{')
//     const closeBrace = cleaned.lastIndexOf('}')

//     if(firstBarce == -1 || closeBrace == -1) return null

//     const jsonString = cleaned.slice(firstBarce,closeBrace+1)
//     return JSON.parse(jsonString)
    


// }
// export default extractJson


const extractJson = async (text) => {
    if (!text) {
        return null;
    } 

    // ✨ SAFEGUARD: If the input is already a parsed object, return it directly
    if (typeof text === 'object') {
        return text;
    }

    // ✨ SAFEGUARD: Ensure it's a string before running string/regex methods
    if (typeof text !== 'string') {
        console.error("extractJson received unexpected type:", typeof text);
        return null;
    }

    // Remove markdown code block backticks if the AI included them
    const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    const firstBrace = cleaned.indexOf('{');
    const closeBrace = cleaned.lastIndexOf('}');

    if (firstBrace === -1 || closeBrace === -1) {
        return null;
    }

    const jsonString = cleaned.slice(firstBrace, closeBrace + 1);
    
    try {
        return JSON.parse(jsonString);
    } catch (parseError) {
        console.error("Failed to parse extracted JSON string:", parseError);
        return null;
    }
};

export default extractJson;



