//required in order to read / create files
const fs = require('fs');

//our starting folder, curenntlt set as the current location of this file
const folder = '.';

//list of music file types we are looking for
const fileTypes = ['.mp3', '.flac', '.m4a'];

//name of the playlist file we will be creating
const playlist = 'playlist.m3u';

//scan the current folder for music
async function analyze(folder) {
	
	//we only want to analyze folders, so if it is a file we won't continue
	const stats = await fs.lstatSync(folder)
	if (stats.isFile())
		return;
	
	//if there are music files in the current folder, we will create our playlist file
	if (await hasMusic(folder)) {
		await writeFile(folder);
	}
		
	//continue to look for more music in subdirectories
	var files = await fs.readdirSync(folder);
	for (var i = 0; i < files.length; i++) {
		analyze(folder + '\\' + files[i]);
	}
}

//write the playlist file of all music files in the specified directory
async function writeFile(folder) {
	
	//where will our playlist file be located
	var filename = folder + '\\' + playlist;
	console.log('creating playlist file: ' + filename);
	
	//get a list of files in the specified folder
	var files = await fs.readdirSync(folder);

	//as we create our playlist file we will only inclde music files
	for (var i = 0; i < files.length; i++) {
		
		//only add music files to the playlist
		if (isMusicFile(files[i]))
			await fs.appendFileSync(filename, files[i] + '\n');
	}
}

//does this folder have at least 1 music file?
async function hasMusic(folder) {
	
	//check all contents for the specified directory
	var files = await fs.readdirSync(folder);
	
	for (var i = 0; i < files.length; i++) {
		
		const stats = await fs.lstatSync(folder + '\\' + files[i]);
		
		//if this is a music file, then we can return true
		if (stats.isFile() && isMusicFile(files[i]))
			return true;
	}
	
	//we didn't find any music files
	return false;
}

//look at the file name to determine if it is a music file
function isMusicFile(filename) {
	
	//check all file types to verify if it is a music file
	for (var j = 0; j < fileTypes.length; j++) {
					
		//if we have a match, this file is a music file
		if (filename.toLowerCase().indexOf(fileTypes[j].toLowerCase()) > -1)
			return true;
	}
	
	return false;
}

//perform operation
console.log('scanning ' + folder);
analyze(folder);
console.log('done');
