const fs = require('fs');
const path = require("path");
const glob = require("glob")

/**
* Class Entries
* Define all entries by going through all modules & themas folders.
* 	You must have an entry to the application
* 		* themes  => ./Spin/Themes/[name_theme]/Resource/spa/react/StarupSpinTheme.tsx
*   	* modules => ./Spin/Module/[name_module]Resource/spa/react/App.tsx
*/
class Entries {
	entry;
	routers;
	time;
    globArray;
	/**
	* @params entry:object default config
	*/			
	constructor(globArray) {
        this.entry = [];
        this.globArray = globArray;
	}

	/**
	* the entries are defined
	*/
    define = () => {
        return new Promise((resolve, reject) => {
            let promise =[];

            this.globArray.forEach((element)=>{
                promise.push(new Promise((_resolve, _reject)=>{
                    glob(element, null,  (er, files) => {
                        files.forEach((f)=>{
                            let file = path.parse(f);
                            let ext = file.ext.replace('.','');
                            let key = ext == "scss" ? `${ext}_${file.name.toLowerCase()}`: file.name.toLowerCase();

                            let value = f;
                            // TODO 
			                // It should optimization to reduce imports of classes
			                // Test: After optimization, it should test pages that import another's clases like floor.ts and look that work correctly
                            //if(ext == 'ts' && key != 'home'){
                            //    value = {
                            //        import: f,
                            //        dependOn: 'home',                      
                            //    }                                
                            //}
                            this.entry[key] = value;
                        });
                        _resolve();
                      
                    });
                }));            
            });

            Promise.all(promise).then(values => {
                resolve(Object.assign({}, this.entry));
            });

        });
    }
}

module.exports = Entries;