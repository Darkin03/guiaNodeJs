const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const folder = process.argv[2] ?? '.';

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    console.error(pc.red(`Error al leer el directorio: ${folder}`));
    process.exit(1);
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch (error) {
      console.log(pc.red(`Error al obtener el archivo: ${filePath}`));
      return null;
    }

    const isDirectory = stats.isDirectory() ? '/' : '';
    const fileType = isDirectory ? 'Directorio' : 'Archivo';
    const filesize = stats.size;
    const fileModified = stats.mtime.toLocaleString();

    return `${pc.cyan(file)}  ${pc.yellow(fileType.padEnd(20))}  ${pc.magenta(filesize.toString().padStart(10))} ${pc.green(fileModified)}`;
  });

  const filesInfo = await Promise.all(filesPromises)
  filesInfo.filter(fileInfo => fileInfo !== null).forEach(fileInfo => console.log(fileInfo));
}

ls(folder);
