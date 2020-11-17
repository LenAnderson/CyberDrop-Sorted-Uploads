// ==UserScript==
// @name         CyberDrop - Sorted Uploads
// @namespace    https://github.com/LenAnderson/
// @downloadURL  https://github.com/LenAnderson/CyberDrop-Sorted-Uploads/raw/master/CyberDrop_sorted_uploads.user.js
// @version      1.0.0
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
		dz.options.autoProcessQueue = false;
		dz.on('addedfiles', files=>{
			console.log('addedfiles: ', files);
			dz.files.sort((a,b)=>a.name<b.name?1:a.name>b.name?-1:0);
			dz.options.autoProcessQueue = true;
			dz.processQueue();
		});
		dz.on('queuecomplete', ()=>{
			console.log('queuecomplete');
			dz.autoProcessQueue = false;
		});
	};
	init();
})();
