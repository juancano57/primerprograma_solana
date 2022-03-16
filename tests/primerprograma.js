const anchor = require("@project-serum/anchor");
const { SystemProgram } = require("@solana/web3.js");

const main = async() => {
  
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Primerprograma;

  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount]
  });

  console.log("El Signature de la Transaccion es: ", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('Contador de GIF ', account.totalGifs.toString());

  await program.rpc.addGif("Inserte un Gif aqui", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey
    },
  });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('Contador Gif ', account.totalGifs.toString());

  console.log('Lista de Gif ', account.gifList);
}


const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();