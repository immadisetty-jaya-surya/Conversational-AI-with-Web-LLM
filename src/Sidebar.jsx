import { IconButton, InputLabel } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings'
import { useState } from "react"
import Settings from "./Settings";

// eslint-disable-next-line react/prop-types
const Sidebar = ({handleSaveSettings,dispatchSettings,clearAllData,settings}) => {
    const [isSettingsOpen,setIsSettingsOpen] = useState(false);
  return (
		<div className="flex flex-col h-screen bg-gray-100 w-64 p-4 shadow-md">
			<div className="flex items-center justify-center mb-4">
				<IconButton onClick={()=>setIsSettingsOpen(true)}>
					<SettingsIcon />
					<p className=" font-semibold text-lg">Settings</p>
				</IconButton>
				<Settings 
					open={isSettingsOpen}
					onClose={()=> setIsSettingsOpen(false)}
					onSave={handleSaveSettings}
					onCancel={()=>setIsSettingsOpen(false)}
					dispatch={dispatchSettings}
					clearAllData={clearAllData}
					settings={settings}
					/>
			</div>
		</div>
  )
}

export default Sidebar