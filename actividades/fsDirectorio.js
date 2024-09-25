const fs = require ('node:fs/promises')
const path = require ('node:path')
const folder = process.argv[2] ?? '.';



async function ls(folder){
    let files; 
    try {
         files = await fs.readdir(folder)
    } catch (error) {
        console.error(`Error al leer el directorio: ${folder}`);
        process.exit(1);
    }


    const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file);
    let stats 
       try {
        stats = await fs.stat(filePath);
       } catch (error) {
         console.log(`Error al obtener el archivo: ${filePath}`);
       }

       const isDirectory = stats.isDirectory() ? '/' : '';
       const fileType = isDirectory ? 'Directorio' : 'Archivo';
       const filesize = stats.size;
       const fileModified = stats.mtime.toLocaleString();

       return `${file}  ${fileType.padEnd(20)}  ${filesize.toString().padStart(10)} ${fileModified}`;

    })

    const filesInfo = await Promise.all(filesPromises);
    filesInfo.forEach(fileInfo => console.log(fileInfo));

   
}
ls (folder)