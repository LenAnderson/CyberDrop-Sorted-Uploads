// ==UserScript==
// @name         CyberDrop - Sorted Uploads
// @namespace    https://github.com/LenAnderson/
// @downloadURL  https://github.com/LenAnderson/CyberDrop-Sorted-Uploads/raw/master/CyberDrop_sorted_uploads.user.js
// @version      1.1.0
// @description  Sort uploads on CyberDrop.me by name
// @author       LenAnderson
// @match        https://cyberdrop.me/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	const wait = async(millis)=>new Promise(resolve=>setTimeout(resolve, millis));

	const init = async()=>{
		let dz = undefined;
		while (dz == undefined) {
			await wait(100);
			dz = Dropzone.instances[0];
		}
		console.log('found dropzone');
		const title = document.title;
		let album = '';
		let numFiles = 0;
		let numDone = 0;
		dz.options.autoProcessQueue = false;
		dz.on('addedfiles', files=>{
			console.log('addedfiles: ', files);
			let albumOpt = document.querySelector('#albumSelect').selectedOptions[0];
			album = albumOpt.value ? albumOpt.textContent : 'Uploading';
			numFiles = files.length;
			numDone = 0;
			document.title = `${album} (${numDone}/${numFiles} | ${title}`;
			dz.files.sort((a,b)=>a.name<b.name?1:a.name>b.name?-1:0);
			dz.options.autoProcessQueue = true;
			dz.processQueue();
		});
		dz.on('complete', ()=>{
			numDone++;
			document.title = `${album} (${numDone}/${numFiles} | ${title}`;
		});
		dz.on('queuecomplete', ()=>{
			console.log('queuecomplete');
			dz.options.autoProcessQueue = false;
			document.title = `Completed ${album} | ${title}`;
		});
	};
	init();
})();
