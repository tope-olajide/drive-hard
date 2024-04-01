
import { useEffect } from "react";

import { useGlobalState } from "./store/GlobalStore";

const AssetsLoader = ({assetName}:{assetName:string}) => {
    const { increaseProgressBar,showAssetName } = useGlobalState();
    
   
    useEffect(() => {
        showAssetName(assetName) 
        return () => {
             showAssetName(assetName)
            increaseProgressBar()
        };
      }, []);


  return <></>
};

export default AssetsLoader;
