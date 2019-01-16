# playlist_m3u
Scan a folder and all it's subdirectories. A playlist file will be created for every directory containing music

A .m3u file's primary purpose is to queue music for playback
It's simply a text file with the location to a number of music files whether they are local on your computer or a url on a website
This program will start at the directory you specify (default is same location as the .js file you are going to run) and will check all subdirectories for music files. Everydirectory that contains music a .m3u file will be created in that directory

To get started either place the index.js file in the parent directory where all your music is or if you want to target a specific parent folder you will need to update the folder location here<br>
<code>const folder = '.';</code>

In order for the program to identify a music file you will specify all file types in this array<br>
<code>const fileTypes = ['.mp3', '.flac', '.m4a'];</code>

You can also choose the name of the play list file or use the default<br>
<code>const playlist = 'playlist.m3u';</code>
