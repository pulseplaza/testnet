

import { useContext, useEffect, useState } from "react";
import Style from "../NFTPriceHistory/NFTPriceHistory.module.css";


import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTPriceHistory = ({ tokenId }) => {
    const { priceHistory } = useContext(NFTMarketplaceContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tokenId) {
            setLoading(true);
            priceHistory(tokenId).then(data => {
                setHistory(data);
                setLoading(false);
            }).catch(error => {
                console.error("Error fetching history:", error);
                setLoading(false);
            });
        }
    }, [tokenId, priceHistory]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>


            <h1 className={Style.title}>Price History</h1>


            {history.length > 0 ? (
                <table className={Style.nft_price_history}>
                    <thead>
                        <tr>
                            <th className={Style.dateColumn}>Date</th>
                            <th className={Style.priceColumn}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td>{item.timestamp}</td>
                                <td>{parseFloat(item.price).toFixed(4).replace(/\.?0+$/, "")} PLS</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Price history could not be fetched from the blockchain explorer.
                    <br /><br />
                    Please try again later.
                </p>
            )}
        </div>
    );
};

export default NFTPriceHistory;


