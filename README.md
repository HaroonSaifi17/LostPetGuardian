# LostPetGuardian

The Website will be accessible at [https://pet.haroonsaifi.site](https://pet.haroonsaifi.site).

## Installation

To get started, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone https://github.com/haroonsaifi17/LostPetGuardian.git && cd LostPetGuardian
```

2. Install project dependencies using npm

```bash
npm install && npm run install
```

## Usage

To run the app, use the following command:

```bash
npm run dev
```

The client app will be accessible at [http://localhost:4200](http://localhost:4200).

The server will be accessible at [http://localhost:4020](http://localhost:4020).

### Blockchain Integration

In this project, we have implemented blockchain technology to enhance the security and immutability of lost pet reports. When a user submits a lost pet report, the system creates a unique transaction and appends it to the blockchain.
The blockchain enhances security by using cryptographic techniques to link each block to the previous one. This linkage, based on hashes, ensures that tampering with one block would require changing all subsequent blocks, making it extremely secure against data manipulation.

### Data Immutability

Once data is added to the blockchain, it becomes immutable. This means that once a lost pet report is added, it cannot be altered or deleted. It provides a permanent and transparent record of all lost pet reports.

By leveraging blockchain technology, we ensure the integrity, security, and transparency of our lost pet report system. Each report becomes part of an immutable transaction chain, enhancing trust and data reliability.

