// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

abstract contract UUPSAccessControlUpgradeable is UUPSUpgradeable, OwnableUpgradeable {
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    event DeployerAuthorizationUpdated(address indexed deployerAddress, bool givenAccess, address indexed byAccount);

    EnumerableSetUpgradeable.AddressSet private deployers;

    function __UUPSAccessControlUpgradeable_init() internal onlyInitializing {
        __Ownable_init();
        __UUPSUpgradeable_init();
        __UUPSAccessControlUpgradeable_init_unchained();
    }

    function __UUPSAccessControlUpgradeable_init_unchained() internal onlyInitializing {}

    function _authorizeUpgrade(address _newImplementation) internal override {
        if (_msgSender() != owner() && !deployers.contains(_msgSender())) {
            revert("Not authorized to upgrade");
        }
    }

    function authorizeDeployer(address _deployer, bool _shouldAuthorize) external onlyOwner returns (bool success) {
        if (_shouldAuthorize) {
            success = deployers.add(_deployer);
        } else {
            success = deployers.remove(_deployer);
        }
        if (success) {
            emit DeployerAuthorizationUpdated(_deployer, _shouldAuthorize, _msgSender());
        }
    }

    function renounceDeployerAuthorization() external returns (bool success) {
        success = deployers.remove(_msgSender());
        if (success) {
            emit DeployerAuthorizationUpdated(_msgSender(), false, _msgSender());
        } else {
            revert("Caller is not deploy authorized");
        }
    }

    function getAuthorizedDeployers() external view returns (address[] memory authorizedDeployers) {
        authorizedDeployers = deployers.values();
    }

    function getAuthorizedDeployerAtIndex(uint256 _index) external view returns (address authorizedDeployer) {
        authorizedDeployer = deployers.at(_index);
    }

    function getAuthorizedDeployerCount() external view returns (uint256 authorizedDeployerCount) {
        authorizedDeployerCount = deployers.length();
    }
}
