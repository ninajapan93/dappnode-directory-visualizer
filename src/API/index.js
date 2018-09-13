import getDirectory from './getDirectory'
import apm from './apm'

/**
 * Fetches all package names in the custom dappnode directory.
 * This feature helps the ADMIN UI load the directory data faster.
 *
 * @param {Object} kwargs: {}
 * @return {Object} A formated success message.
 * result: packages =
 *   [
 *     {
 *       name: packageName, (string)
 *       status: 'Preparing', (string)
 *       currentVersion: '0.1.2' or null, (String)
 *     },
 *     ...
 *   ]
 */

async function fetchDirectory() {

  const packages = await getDirectory();

  // Extend package object contents
  const packagesCache = await Promise.all(packages.map(async (pkg) => {
    const {name} = pkg;
    const packageReq = {name, ver: 'latest'}
    // Fetch the current package version
    const versions = await apm.getRepoVersions(packageReq);
    await Promise.all(Object.keys(versions).map(async version => {
        try {
            const hash = versions[version]
            versions[version] = await fetch('https://ipfs.io'+hash)
        .then(res => res.json())
        } catch(e) {
            console.log('Error fetching '+name+' @ '+version)
        }
    }))
    // Append results and return
    return {
        ...pkg,
        versions
    };
  }));
  console.log(packagesCache)
  return packagesCache
};

export default fetchDirectory
