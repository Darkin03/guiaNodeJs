const fs = require ('node:fs/promises')

const folder = process.argv[2] ?? '.';



async function ls(directorio){

    try {
        const files = await fs.readdir(folder)
    } catch (error) {
        console.error('Error al leet el directorio: ',err)
    }

    const files = await fs.readdir(folder)
    .then(
        files =>{
            files.forEach(file=>{
                const filePath=  path.join(folder,file);
                fs.stat(filePath)
            })
        }
    )
    
    .catch(
        err=>{
            if(err){
                console.error('Error al leet el directorio: ',err)
            }
        }
    )
}
ls (folder)