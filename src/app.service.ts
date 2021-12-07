import { Injectable } from '@nestjs/common';
import NodeRSA from 'encrypt-rsa';
import * as fs from 'fs'
import path from 'path';

@Injectable()
export class AppService {
  getHello() {
    const nodeRSA = new NodeRSA();
    const { privateKey, publicKey } = nodeRSA.createPrivateAndPublicKeys()
    // to save your keys
    fs.writeFileSync('./private-key', privateKey);
    fs.writeFileSync('./public-key', publicKey);


    // you must have 'public-key' file the key you want to encrypt by it

    const encryptedText = nodeRSA.encryptStringWithRsaPublicKey({ 
      text: 'Marciel', 
      keyPath:'./public-key'
    });

    console.log({ encryptedText });

    //result:  {
    //   encryptedText: 'QAoJBAj7ZqYR9Qb9vFGfpjBVY7BP0MtlPywyxMSodA7WmOmOn0glOlrLxUqjJrmaKsqxdJxZadEMAM8+6gLNhwcLtbFPRLQEUTSHk2NNhehsPOESoNjwbXOj5Y+zBCSkjVuW6MRkdaTZeGXi0sii1OqvIQGmOaOR2xzEdDj2eD8='
    // }

    // you must have 'private-key' file the key you want to decrypt by it

    const decryptedText = nodeRSA.decryptStringWithRsaPrivateKey({ 
      text: encryptedText, 
      keyPath:'./private-key'
    });

    
    console.log({ decryptedText });
    // result: { decryptedText: 'hello' }
    return { decryptedText,encryptedText}
  }
}
