export interface MaxPaidPlayers {
    amount: string,
    players: [
      {
        label: string,
        name: string,
        price: number,
        role: string
      }
    ],
    role: string
}