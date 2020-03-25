import { promisify } from 'util';
import { linkedPackagesName, PackageJson } from '../injection-tokens';
import { writeFile } from 'fs';

export async function modifyJson(
  packageJson: PackageJson,
  dependencies: { dep: string; folder: string }[]
) {
  console.log('dependencies', dependencies)
  await Promise.all(
    dependencies.map(async ({ dep }) => {
      console.log(`file:./${linkedPackagesName}/${
        dep.split('/')[1]
      }`)
      console.log('dep', JSON.stringify(dep, null, 4))
      packageJson.dependencies[dep] = `file:./${linkedPackagesName}/${
        dep.split('/')[1]
      }`;
    })
  );
  await promisify(writeFile)(
    './package.json',
    JSON.stringify(packageJson, null, 2),
    { encoding: 'utf-8' }
  );
}
