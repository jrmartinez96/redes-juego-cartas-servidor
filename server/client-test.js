import net from 'net';
import Protocol from '../protocol/protocolo-conquian.js';

let protocol = new Protocol();

const client = net.connect({port: 8080},function(){
    console.log('client connected');
    client.write(JSON.stringify(protocol.serverResponse0));
});