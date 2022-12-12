import { AvailableRootsRegistry } from './../../../../types/AvailableRootsRegistry';
import { CommitmentMapperRegistry } from './../../../../types/CommitmentMapperRegistry';
import { AddressesProvider } from '../../../../types/AddressesProvider';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import hre, { ethers } from 'hardhat';
import { Deployed0 } from 'tasks/deploy-tasks/full/0-deploy-core-and-hydra-s1-simple-and-accountbound-and-pythia1.task';
import { AttestationsRegistry, Badges, Front, HydraS1AccountboundAttester } from 'types';
import { HydraS1Verifier } from '@sismo-core/hydra-s1';
import { formatBytes32String, toUtf8Bytes } from 'ethers/lib/utils';

const SismoContractsAddress = '0x3340Ac0CaFB3ae34dDD53dba0d7344C1Cf3EFE05';

describe('Test Sismo Addresses Provider', () => {
  let deployer: SignerWithAddress;
  let proxyAdminSigner: SignerWithAddress;
  let randomSigner: SignerWithAddress;

  let attestationsRegistry: AttestationsRegistry;
  let badges: Badges;
  let front: Front;
  let hydraS1AccountboundAttester: HydraS1AccountboundAttester;
  let commitmentMapperRegistry: CommitmentMapperRegistry;
  let availableRootsRegistry: AvailableRootsRegistry;
  let hydraS1Verifier: HydraS1Verifier;

  let sismoAddressesProvider: AddressesProvider;

  before(async () => {
    const signers = await hre.ethers.getSigners();
    [deployer, , proxyAdminSigner, , , , randomSigner] = signers;
    ({
      attestationsRegistry,
      badges,
      hydraS1AccountboundAttester,
      front,
      availableRootsRegistry,
      commitmentMapperRegistry,
      hydraS1Verifier,
    } = (await hre.run('0-deploy-core-and-hydra-s1-simple-and-accountbound-and-pythia1', {
      options: {
        proxyAdmin: proxyAdminSigner.address,
      },
    })) as Deployed0);
  });

  /*************************************************************************************/
  /********************************** DEPLOYMENTS **************************************/
  /*************************************************************************************/
  describe('Deployments', () => {
    it('Should deploy the Sismo Contract Registry', async () => {
      ({ sismoAddressesProvider } = await hre.run('deploy-sismo-addresses-provider', {
        owner: deployer.address,
        badges: badges.address,
        attestationsRegistry: attestationsRegistry.address,
        front: front.address,
        hydraS1AccountboundAttester: hydraS1AccountboundAttester.address,
        commitmentMapperRegistry: commitmentMapperRegistry.address,
        availableRootsRegistry: availableRootsRegistry.address,
        hydraS1Verifier: hydraS1Verifier.address,
        options: {
          deploymentNamePrefix: 'firstDeployment',
        },
      }));
      expect(sismoAddressesProvider.address).to.be.eql(SismoContractsAddress);
    });
  });

  describe('Getters', () => {
    it('Should get the sismo contracts addresses via get (string)', async () => {
      const badgesAddress = await sismoAddressesProvider['get(string)']('Badges');
      const attestationsRegistryAddress = await sismoAddressesProvider['get(string)'](
        'AttestationsRegistry'
      );
      const frontAddress = await sismoAddressesProvider['get(string)']('Front');
      const hydraS1AccountboundAttesterAddress = await sismoAddressesProvider['get(string)'](
        'HydraS1AccountboundAttester'
      );
      const commitmentMapperRegistryAddress = await sismoAddressesProvider['get(string)'](
        'CommitmentMapperRegistry'
      );
      const availableRootsRegistryAddress = await sismoAddressesProvider['get(string)'](
        'AvailableRootsRegistry'
      );
      const hydraS1VerifierAddress = await sismoAddressesProvider['get(string)']('HydraS1Verifier');

      expect(badgesAddress).to.be.eql(badges.address);
      expect(attestationsRegistryAddress).to.be.eql(attestationsRegistry.address);
      expect(frontAddress).to.be.eql(front.address);
      expect(hydraS1AccountboundAttesterAddress).to.be.eql(hydraS1AccountboundAttester.address);
      expect(commitmentMapperRegistryAddress).to.be.eql(commitmentMapperRegistry.address);
      expect(availableRootsRegistryAddress).to.be.eql(availableRootsRegistry.address);
      expect(hydraS1VerifierAddress).to.be.eql(hydraS1Verifier.address);
    });

    it('Should get the sismo contracts addresses via get (bytes)', async () => {
      const badgesAddress = await sismoAddressesProvider['get(bytes32)'](
        '0x15d2933074e73f086bfb9519dba2cdd49365b34eb1249e7af583c2103fa36b20'
      );
      const attestationsRegistryAddress = await sismoAddressesProvider['get(bytes32)'](
        '0x104a0d9235908d95cabc17e4ed670e9ff552850136bf8891e85aac4e7f8377a9'
      );
      const frontAddress = await sismoAddressesProvider['get(bytes32)'](
        '0x144c56ac1dee5ecf8bec5f9d3b444fd95f6723c5aebe99eebdbe8ee99562055e'
      );
      const hydraS1AccountboundAttesterAddress = await sismoAddressesProvider['get(bytes32)'](
        '0x261eee5b5685c8c5c058afb720adf3f868b47e35bd626cd373381d93303c94b3'
      );
      const commitmentMapperRegistryAddress = await sismoAddressesProvider['get(bytes32)'](
        '0x4bd7025fe70d7eceb8faea0c50144406ca8ccfd19e85adc6df146f7595a5cd5a'
      );
      const availableRootsRegistryAddress = await sismoAddressesProvider['get(bytes32)'](
        '0xd2452158462d5f6fd63e910f75849c6d0cc5a46a8e47f9e81ade14763cfc98ea'
      );
      const hydraS1VerifierAddress = await sismoAddressesProvider['get(bytes32)'](
        '0x11844776da8f5d1b2f51315d8aad249394b4829839accacf4a22459265d79e1e'
      );

      expect(badgesAddress).to.be.eql(badges.address);
      expect(attestationsRegistryAddress).to.be.eql(attestationsRegistry.address);
      expect(frontAddress).to.be.eql(front.address);
      expect(hydraS1AccountboundAttesterAddress).to.be.eql(hydraS1AccountboundAttester.address);
      expect(commitmentMapperRegistryAddress).to.be.eql(commitmentMapperRegistry.address);
      expect(availableRootsRegistryAddress).to.be.eql(availableRootsRegistry.address);
      expect(hydraS1VerifierAddress).to.be.eql(hydraS1Verifier.address);
    });

    it('Should get the sismo contracts addresses via getAll', async () => {
      const allContractInfos = await sismoAddressesProvider.getAll();
      const [allNames, allNamesHash, allAddresses] = allContractInfos;

      expect(allNames).to.be.eql([
        'Badges',
        'AttestationsRegistry',
        'Front',
        'HydraS1AccountboundAttester',
        'AvailableRootsRegistry',
        'CommitmentMapperRegistry',
        'HydraS1Verifier',
      ]);

      expect(allNamesHash).to.be.eql([
        ethers.utils.keccak256(toUtf8Bytes('Badges')),
        ethers.utils.keccak256(toUtf8Bytes('AttestationsRegistry')),
        ethers.utils.keccak256(toUtf8Bytes('Front')),
        ethers.utils.keccak256(toUtf8Bytes('HydraS1AccountboundAttester')),
        ethers.utils.keccak256(toUtf8Bytes('AvailableRootsRegistry')),
        ethers.utils.keccak256(toUtf8Bytes('CommitmentMapperRegistry')),
        ethers.utils.keccak256(toUtf8Bytes('HydraS1Verifier')),
      ]);

      expect(allAddresses).to.be.eql([
        badges.address,
        attestationsRegistry.address,
        front.address,
        hydraS1AccountboundAttester.address,
        availableRootsRegistry.address,
        commitmentMapperRegistry.address,
        hydraS1Verifier.address,
      ]);
    });
  });

  describe('Setters', () => {
    it('Should set a contract address', async () => {
      const newBadgesAddress = '0x0000000000000000000000000000000000000001';
      const setTx = await sismoAddressesProvider.set(newBadgesAddress, 'newBadgesContract');

      await expect(setTx)
        .emit(sismoAddressesProvider, 'ContractAddressSet')
        .withArgs(newBadgesAddress, 'newBadgesContract');

      const newBadgesContract = await sismoAddressesProvider['get(string)']('newBadgesContract');
      expect(newBadgesContract).to.be.eql(newBadgesAddress);
    });

    it('Should revert if caller is not owner', async () => {
      const newBadgesAddress = '0x0000000000000000000000000000000000000001';
      await expect(
        sismoAddressesProvider.connect(randomSigner).set(newBadgesAddress, 'newBadgesContract')
      ).to.be.revertedWith('a');
    });

    it('Should set several contract addresses via setBatch', async () => {});
  });
});