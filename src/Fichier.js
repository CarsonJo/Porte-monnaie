import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';





export async function saveFile(fichier){
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted){
        console.log('permission non accroder')
        return;
    }
        try {
    await StorageAccessFramework.createFileAsync(permissions.directoryUri, 'fileName.csv', 'text/csv')
    .then(async(uri) => {
        await FileSystem.writeAsStringAsync(uri,fichier)
        alert("fichier bien enregistré")
        console.log(uri,'RRRR');
    })
    .catch((e) => {
        console.log(e,permissions,'pititeErreur');
    });
} catch(e){
    console.log(e,'pititeErreur');
};
}
export default saveFile


















