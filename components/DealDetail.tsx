import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataProvider';
import { DealContext } from '../contexts/DealContext';

const DealDetail: React.FC = () => {
    const { dealId } = useParams<{ dealId: string }>();
    const navigate = useNavigate();
    const { dailyDeals } = useContext(DataContext);
    const { openDealModal } = useContext(DealContext);

    useEffect(() => {
        if (dealId && dailyDeals.length > 0) {
            const dealToOpen = dailyDeals.find(deal => deal.id === dealId);

            if (dealToOpen && dealToOpen.rules) {
                openDealModal(dealToOpen);
                navigate('/deals', { replace: true });
            } else {
                navigate('/deals', { replace: true });
            }
        }
    }, [dealId, dailyDeals, openDealModal, navigate]);
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-white text-xl">Loading Deal...</div>
        </div>
    );
};

export default DealDetail;
