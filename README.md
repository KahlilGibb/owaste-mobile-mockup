# oWaste Mobile App

A NextJS-based mobile application for waste management and recycling rewards. The app features an e-wallet system where users can earn points for recycling and convert them to cash or redeem various eco-friendly rewards.

## Features

- **E-Wallet Dashboard**

  - Points balance tracking
  - Point to cash conversion (1 point = Rp 150)
  - Progress tracking towards next reward milestone
  - Recent activity monitoring

- **Reward System**

  - Various eco-friendly rewards
  - Real-time points redemption
  - Reward status tracking

- **Transaction History**
  - Detailed transaction logs
  - Activity tracking for points earned and spent
  - Visual indicators for different transaction types

## Technology Stack

- Next.js 15.2.4
- React
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or pnpm package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/KahlilGibb/owaste-mobile-mockup.git
cd owaste-mobile-mockup
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

### Accessing the App

#### Local Development

- Open [http://localhost:3000](http://localhost:3000) in your browser

#### Mobile Access (Same Network)

1. Find your computer's IP address (e.g., 192.168.1.7)
2. Make sure your mobile device is connected to the same WiFi network
3. Access the app via `http://[YOUR_IP]:3000` (e.g., http://192.168.1.7:3000)

## Project Structure

```
owaste-app/
├── app/                  # Next.js app directory
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── ui/            # UI components
│   └── ...            # Other components
├── public/             # Static assets
└── styles/            # Global styles
```

## Features in Detail

### E-Wallet

- Points tracking and management
- Cash conversion system
- Transaction history
- Real-time balance updates

### Rewards

- Coffee vouchers
- Shopping discounts
- Environmental initiatives
- Public transport passes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- UI Components by Radix UI
- Icons by Lucide Icons
- Built with Next.js and React
