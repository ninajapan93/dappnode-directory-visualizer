import directoryContract from './contracts/directory.json'
import web3 from './web3Setup'


// Contract parameters
const DAppNodePackageStatus = ['Preparing', 'Develop', 'Active', 'Deprecated', 'Deleted'];

 /**
  * Fetches all package names in the custom dappnode directory.
  *
  * @return {Array} An array of objects:
  *  [
  *    {
  *      name: packageName,  (string)
  *      status: 'Preparing' (string)
  *    },
  *    ...
  *  ]
  */
 export default async function getDirectory() {
  const directory = new web3.eth.Contract(directoryContract.abi, directoryContract.address);
  const numberOfDAppNodePackages = parseFloat(
    await directory.methods.numberOfDAppNodePackages().call()
  );

  let packages = [];
  for (let i = 0; i < numberOfDAppNodePackages; i++) {
    try {
      const pkg = await directory.methods.getPackage(i).call();
      packages.push({
        name: pkg.name,
        status: DAppNodePackageStatus[pkg.status],
      });
    } catch (e) {
      console.error('Error retrieving package #' + i + ' from directory, err: ' + e);
    }
  }
  return packages;
}
