import { BROWSER_MATRIX } from '@/settings/settings.app.js';
import { info } from './device';

const ALLOWED_COMPARISONS = ['>=', '<=', '>', '<'];

const compareVersions = (deviceVersion, matrixVersion, sign) => {
  switch (sign) {
    case '>=':
      return deviceVersion >= matrixVersion;
    case '<=':
      return deviceVersion <= matrixVersion;
    case '>':
      return deviceVersion > matrixVersion;
    default:
      return deviceVersion < matrixVersion;
  }
};

const getRequirements = (deviceInfo) => {
  const requirements = {};
  if (deviceInfo) {

    const correspondingMatrix = BROWSER_MATRIX[deviceInfo.os.name];
    requirements.osVersion = correspondingMatrix
      ? correspondingMatrix.os
      : null;

    if (correspondingMatrix) {
      const correspondingBrowser = correspondingMatrix.browsers[deviceInfo.browser.name];
      requirements.browserVersion = correspondingBrowser
        ? correspondingBrowser
        : null;
    }
  }
  return requirements;
};

const checkCompatibility = (currentVersion, requiredVersion) => {
  let match = false;
  let stop = false;

  if (currentVersion && requiredVersion) {
    if (typeof requiredVersion === 'object') { // os matrix is an array
      let stopRequirementCheck = false;
      for (let j = 0; j < requiredVersion.length && !stopRequirementCheck; j++) {
        const requirement = requiredVersion[j];

        if (requirement) {
          stop = false;
          for (let i = 0; i < ALLOWED_COMPARISONS.length && !stop; i++) {
            const comparisonMatch = requirement.match(ALLOWED_COMPARISONS[i]);
            const comparisonSign = comparisonMatch ? comparisonMatch[0] : null;
            if (comparisonSign) {
              const matrixVersion = requirement.split(comparisonSign)[1];
              match = compareVersions(currentVersion, matrixVersion, comparisonSign);
              stop = true;
            }
          }

          if (!match) {
            stopRequirementCheck = true;
          }
        }
      }
    } else {
      for (let i = 0; i < ALLOWED_COMPARISONS.length && !stop; i++) {
        const comparisonMatch = requiredVersion.match(ALLOWED_COMPARISONS[i]);
        const comparisonSign = comparisonMatch ? comparisonMatch[0] : null;
        if (comparisonSign) {
          const matrixVersion = requiredVersion.split(comparisonSign)[1];
          match = compareVersions(currentVersion, matrixVersion, comparisonSign);
          stop = true;
        }
      }
    }
  }

  return match;
};

const checkRequirements = (currentDevice) => {
  const requirements = getRequirements(currentDevice);
  const compatibility = {
    os : checkCompatibility(
      currentDevice.os.version,
      requirements.osVersion
    ),
    browser : checkCompatibility(
      currentDevice.browser.version,
      requirements.browserVersion
    )
  };
  return compatibility;
};

export const checkDeviceSupport = () => {
  const currentDevice = {
    os : {
      name    : info.os.name,
      version : info.os.majorVersion
    },
    browser : {
      name    : info.browser.name,
      version : info.browser.majorVersion,
    }
  };

  return checkRequirements(currentDevice);
};
