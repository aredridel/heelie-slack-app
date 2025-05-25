const fs = require('fs/promises');
const { resolve } = require('path');

const path = resolve(__dirname, '../db');

const database = {
  async get(key) {
    try {
      const data = await fs.readFile(resolve(path, `team-${key}`));
      return JSON.parse(data);
    } catch (e) {
      if (e.code !== 'ENOTFOUND') throw e;
      return null;
    }
  },
  async delete(key) {
    try {
      await fs.unlink(resolve(path, `team-${key}`));
    } catch (e) {
      if (e.code !== 'ENOTFOUND') throw e;
    }
  },
  async set(key, value) {
    await fs.writeFile(resolve(path, `team-${key}`), JSON.stringify(value));
  },
};

const fileStore = {
  storeInstallation: async (installation) => {
    // Bolt will pass your handler an installation object
    // Change the lines below so they save to your database
    if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
      // handle storing org-wide app installation
      return database.set(installation.enterprise.id, installation);
    }
    if (installation.team !== undefined) {
      // single team app installation
      return database.set(installation.team.id, installation);
    }
    throw new Error('Failed saving installation data to installationStore');
  },
  fetchInstallation: async (installQuery) => {
    // Bolt will pass your handler an installQuery object
    // Change the lines below so they fetch from your database
    if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
      // handle org wide app installation lookup
      return database.get(installQuery.enterpriseId);
    }
    if (installQuery.teamId !== undefined) {
      // single team app installation lookup
      return database.get(installQuery.teamId);
    }
    throw new Error('Failed fetching installation');
  },
  deleteInstallation: async (installQuery) => {
    // Bolt will pass your handler  an installQuery object
    // Change the lines below so they delete from your database
    if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
      // org wide app installation deletion
      return database.delete(installQuery.enterpriseId);
    }
    if (installQuery.teamId !== undefined) {
      // single team app installation deletion
      return database.delete(installQuery.teamId);
    }
    throw new Error('Failed to delete installation');
  },
};

module.exports = { fileStore };
