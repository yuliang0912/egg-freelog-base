import {join} from 'path';
import {readdirSync, statSync} from 'fs';
import {isFunction, isObject} from 'util';
import {isClass} from './freelog-common-func';
import {FreelogApplication} from '../index';

export function loaderCustomDirAndFile(app: FreelogApplication) {

    const baseDir = app.config.baseDir;
    const customFileLoader: any[] = app.config.customFileLoader;
    if (!Array.isArray(customFileLoader) || !customFileLoader.length) {
        return;
    }

    for (const item of customFileLoader) {
        let fullPath = '',
            isRecursion = false;
        if (isObject(item)) {
            isRecursion = item.isRecursion;
            fullPath = join(baseDir, item.dir);
        } else {
            fullPath = join(baseDir, item);
        }
        if (statSync(fullPath).isFile()) {
            return loadFile(app, fullPath);
        }
        loadFileFromDir(fullPath, isRecursion);

    }
}

function loadFileFromDir(app, dirPath, isRecursion = false) {
    readdirSync(dirPath).forEach(subFile => {
        const subFullPath = join(dirPath, subFile);
        if (statSync(subFullPath).isFile()) {
            loadFile(app, subFullPath);
        } else if (isRecursion) {
            loadFileFromDir(app, subFullPath, isRecursion);
        }
    });
}

function loadFile(app, filePath) {
    const exports = require(filePath);
    if (isClass(exports)) {
        return new exports(app);
    }
    if (isFunction(exports)) {
        return exports(app);
    }
    return exports;

}

