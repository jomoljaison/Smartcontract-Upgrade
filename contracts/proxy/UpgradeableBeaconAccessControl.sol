// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/IBeacon.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";

/**
 * @dev This contract is used in conjunction with one or more instances of {BeaconProxy} to determine their
 * implementation contract, which is where they will delegate all function calls.
 *
 * An owner is able to change the implementation the beacon points to, thus upgrading the proxies that use this beacon.
 * Additionally, an owner may authorize or revoke other wallets ability to change the implementation the beacon points to.
 */
contract UpgradeableBeaconAccessControl is IBeacon, Ownable {
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    event UpgraderAuthorizationUpdated(address indexed upgraderAddress, bool givenAccess, address indexed byAccount);

    EnumerableSetUpgradeable.AddressSet private upgraders;

    address private _implementation;

    /**
     * @dev Emitted when the implementation returned by the beacon is changed.
     */
    event Upgraded(address indexed implementation);

    /**
     * @dev Sets the address of the initial implementation, and the deployer account as the owner who can upgrade the
     * beacon.
     */
    constructor(address implementation_) {
        _setImplementation(implementation_);
    }

    /**
     * @dev Returns the current implementation address.
     */
    function implementation() public view virtual override returns (address) {
        return _implementation;
    }

    /**
     * @dev Upgrades the beacon to a new implementation.
     *
     * Emits an {Upgraded} event.
     *
     * Requirements:
     *
     * - msg.sender must be the owner of the contract or authorized by the owner to perform upgrades.
     * - `newImplementation` must be a contract.
     */

    function upgradeTo(address newImplementation) public virtual {
        if (_msgSender() != owner() && !upgraders.contains(_msgSender())) {
            revert("Not authorized to upgrade");
        }
        _setImplementation(newImplementation);
        emit Upgraded(newImplementation);
    }

    /**
     * @dev Sets the implementation contract address for this beacon
     *
     * Requirements:
     *
     * - `newImplementation` must be a contract.
     */
    function _setImplementation(address newImplementation) private {
        require(Address.isContract(newImplementation), "UpgradeableBeacon: implementation is not a contract");
        _implementation = newImplementation;
    }

    function authorizeupgrader(address _upgrader, bool _shouldAuthorize) external onlyOwner returns (bool success) {
        if (_shouldAuthorize) {
            success = upgraders.add(_upgrader);
        } else {
            success = upgraders.remove(_upgrader);
        }
        if (success) {
            emit UpgraderAuthorizationUpdated(_upgrader, _shouldAuthorize, _msgSender());
        }
    }

    function renounceUpgraderAuthorization() external returns (bool success) {
        success = upgraders.remove(_msgSender());
        if (success) {
            emit UpgraderAuthorizationUpdated(_msgSender(), false, _msgSender());
        }
    }

    function getAuthorizedUpgraders() external view returns (address[] memory authorizedUpgraders) {
        authorizedUpgraders = upgraders.values();
    }

    function getAuthorizedUpgraderAtIndex(uint256 _index) external view returns (address authorizedUpgrader) {
        authorizedUpgrader = upgraders.at(_index);
    }

    function getAuthorizedUpgraderCount() external view returns (uint256 authorizedUpgraderCount) {
        authorizedUpgraderCount = upgraders.length();
    }
}
