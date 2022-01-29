import { useEffect, useRef, useState } from "react";
import { fetchHelper } from '../../../../src/helpers/fetchHelper';

const wallets = [
    {
        id: "ngn-wallet",
        name: "NGN Wallet"
    },
    {
        id: "usd-wallet",
        name: "USD Wallet"
    }
];



export const Content = ()=> {
    const convertToRef = useRef(0);
    const convertFromRef = useRef(0);

    const [wallet, setWallet] = useState({
        convertFrom: "NGN Wallet",
        convertTo: ""
    });

    const [walletList, setWalletList] = useState({
        convertFrom: wallets,
        convertTo: wallets
    });

    const [convertButton, setConvertButton] = useState("Convert");

    const [conversion, setConversion] = useState(null);

    const [mapConversion, setMapConversion] = useState({
        to: "",
        from: ""
    });
    
    


    const handleConvertFrom = (event)=>{
        setWallet(prev=> ({...prev, convertFrom: event.target.value}));
    }

    const handleConvertTo = (event)=>{
        setWallet(prev=> ({...prev, convertTo: event.target.value}));
    }

    const handleConvertToInput = async (event)=> {
        setConvertButton("Processing");
        const isoCode = wallet.convertTo.split(' ')[0];
        const url = `https://api.exchangerate-api.com/v4/latest/${isoCode}`;

        let result = null;
        if(wallet.convertTo && wallet.convertFrom){
            result = await fetchHelper(url, 'GET');
            setConversion(result.rates[wallet.convertFrom.split(' ')[0]]);

            convertFromRef.current.value = Number(result.rates[wallet.convertFrom.split(' ')[0]]) * event.target.value

            setMapConversion({from: isoCode, to: wallet.convertFrom.split(' ')[0] });

            setConvertButton("Convert");

        }
        


    }

    const handleConvertFromInput = async (event)=> {
        setConvertButton("Processing");

        const isoCode = wallet.convertFrom.split(' ')[0];
        const url = `https://api.exchangerate-api.com/v4/latest/${isoCode}`;

        let result = null;
        if(wallet.convertTo && wallet.convertFrom){
            result = await fetchHelper(url, 'GET');
            setConversion(result.rates[wallet.convertTo.split(' ')[0]]);

            convertToRef.current.value = Number(result.rates[wallet.convertTo.split(' ')[0]]) * event.target.value;

            setMapConversion({from: isoCode, to: wallet.convertTo.split(' ')[0] });

            setConvertButton("Convert");

        }


    }

    useEffect(()=>{
        setWalletList({
            convertFrom: wallets.filter(w => w.name !== wallet.convertTo),
            convertTo: wallets.filter(w => w.name !== wallet.convertFrom),   
        })
    }, [wallet]);


    return (
        <div className="content">
            <div>
                <div className="close-btn">&times;</div>
            </div>
            
            <div className="conversion">
                <div>
                    <h3 style={{color: '#7A7D7D'}}>
                        Convert from one currency to another
                    </h3>

                    <div className="currency-input">
                        <details className="custom-select">
                            <summary className="radios">
                                {
                                    walletList.convertFrom.map(w => (
                                        <input 
                                            key={w.id}
                                            type="radio" 
                                            name="item-from" 
                                            id={`${w.id}-from`}  
                                            title={w.name} 
                                            value={w.name}
                                            defaultChecked={w.id === 'ngn-wallet'} 
                                            onChange={handleConvertFrom}/>
                                    ))
                                }
                                
                            </summary>

                            <ul className="list">
                                {
                                    walletList.convertFrom.map(w => (
                                        <li key={w.id}>
                                            <label htmlFor={`${w.id}-from`}>{w.name}</label>
                                        </li> 
                                    ))
                                }
                            </ul>

                        </details>
                        
                        <div className="balance">
                            <span className="balance-text">Balance</span> <br/>
                            &#8358;699,995
                        </div>

                        <div>
                            <input type="text" className="form-input" id="name" defaultValue={0} onChange={handleConvertFromInput} ref={convertFromRef}  />
                        </div>
                    </div>


                    <div>
                        {
                            conversion != null && 
                            <div>
                                1{mapConversion.from.toLocaleUpperCase()} = {conversion}{mapConversion.to.toLocaleUpperCase()} <br/>

                                (Guranteed rate 3 minutes)
                            </div>
                            
                        }
                    </div>

                    
                    <div className="currency-input">
                        <details className="custom-select">
                            <summary className="radios">
                                <input type="radio" name="item" id="default" title="Convert to" defaultChecked/>
                                {
                                    walletList.convertTo.map(w => (
                                        <input 
                                            key={w.id} 
                                            type="radio" 
                                            name="item" 
                                            id={w.id} 
                                            value={w.name} 
                                            title={w.name}  
                                            onChange={handleConvertTo}
                                        />
                                    ))
                                }
                            </summary>
                            <ul className="list">
                                {
                                    walletList.convertTo.map(w => (
                                        <li key={w.id}>
                                            <label htmlFor={w.id}>{w.name}</label>
                                        </li> 
                                    ))
                                }
                            </ul>

                        </details>
                        
                        <div className="balance">
                            <span className="balance-text">Balance</span> <br/>
                            &#36;0
                        </div>

                        <div>
                            <input type="text" className="form-input" id="name" defaultValue={0} onChange={handleConvertToInput} ref={convertToRef}  />
                        </div>
                    </div>

                    <div>
                        <button type="button" className="convert-btn">
                            {convertButton}
                        </button>
                    </div>
                </div>

                <div className="display-conversion-box">
                    <div>You're converting: {wallet.convertFrom.split(' ')[0]}{Intl.NumberFormat().format(convertFromRef?.current?.value)}</div>
                    
                    {
                        conversion && 
                        <>
                            <div>Exchange rate: 1{mapConversion.from.toLocaleUpperCase()} = {conversion}{mapConversion.to.toLocaleUpperCase()} <br/></div>
                            <div>You'll get: {wallet.convertTo.split(' ')[0]}{Intl.NumberFormat().format(Number(convertToRef.current.value).toFixed(3))}</div>
                        </>
                    }


                    <div>Source: {wallet.convertFrom.split(' ')[0]} wallet</div>
                    {
                        wallet.convertTo && 
                        <div>Destination: {wallet.convertTo.split(' ')[0]} wallet</div>
                    }
                </div>
            </div>
        </div>
    )
}