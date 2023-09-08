import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DvrRoundedIcon from '@mui/icons-material/DvrRounded';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MonitorRoundedIcon from '@mui/icons-material/MonitorRounded';
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
export const FloorMenuItem = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
          <DvrRoundedIcon/>
          </ListItemIcon>
          <ListItemText>FLOOR VISUALIZATION</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Add your sub-items here */}
          <ListItem button onClick={() => onClick('/home/item1')}>
            <ListItemText primary="floor 1" />
          </ListItem>
          <ListItem button onClick={() => onClick('/home/item2')}>
            <ListItemText primary="floor 2" />
          </ListItem>
          <ListItem button onClick={() => onClick('/home/item3')}>
            <ListItemText primary="floor 3" />
          </ListItem>
          <ListItem button onClick={() => onClick('/home/item4')}>
            <ListItemText primary="floor 4" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export const ControlMenuItem = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            <ControlPointRoundedIcon />
          </ListItemIcon>
          <ListItemText>CONTROL</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Add your sub-items here */}
          <ListItem button onClick={() => onClick('/control/floor-wise-product-priority')}>
            <ListItemText primary="Floor wise product priority" />
          </ListItem>
          <ListItem button onClick={() => onClick('/control/runtime-machine-infeed')}>
            <ListItemText primary="Runtime machine Infeed" />
          </ListItem>
          <ListItem button onClick={() => onClick('/control/runtime-machine-outfeed')}>
            <ListItemText primary="Runtime machine Outfeed" />
          </ListItem>
          <ListItem button onClick={() => onClick('/control/zotb-details')}>
            <ListItemText primary="Zotb Details" />
          </ListItem>
          <ListItem button onClick={() => onClick('/control/manage-stock-and-dispatch')}>
            <ListItemText primary="Manage Stock and Dispatch" />
          </ListItem>
          <ListItem button onClick={() => onClick('/control/manage-location')}>
            <ListItemText primary="Manage Location" />
          </ListItem>
          <ListItem button onClick={() => onClick('/control/equipment-control')}>
            <ListItemText primary="Equipment Control" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
export const MasterMenuItem = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            <ManageAccountsRoundedIcon />
          </ListItemIcon>
          <ListItemText>MASTER</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Add your sub-items here */}
          <ListItem button onClick={() => onClick('/master/manage-user')}>
            <ListItemText primary="Manage User" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-product')}>
            <ListItemText primary="Manage Product" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-sku')}>
            <ListItemText primary="Manage SKU" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-role')}>
            <ListItemText primary="Manage Role" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-dms-stacker')}>
            <ListItemText primary="Manage DMS Stacker" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-dms-position')}>
            <ListItemText primary="Manage DMS Position" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-dms-dock')}>
            <ListItemText primary="Manage DMS Dock" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-dms-decision-point')}>
            <ListItemText primary="Manage DMS Decision Point" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-dms-equipment-details')}>
            <ListItemText primary="Manage DMS Equipment Details" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/upload-equipment-alarm')}>
            <ListItemText primary="Upload Equipment Alarm" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/view-equipment-alarm')}>
            <ListItemText primary="View Equipment Alarm" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-dms-position-tag-details')}>
            <ListItemText primary="Manage DMS Position Tag Details" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/batch-modification')}>
            <ListItemText primary="Batch Modification" />
          </ListItem>
          <ListItem button onClick={() => onClick('/master/manage-loading-bay-outfeed-palette')}>
            <ListItemText primary="Manage Loading Bay Outfeed Palette" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
export const ReportMenuItem = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            <SummarizeRoundedIcon />
          </ListItemIcon>
          <ListItemText>REPORT</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Add your sub-items here */}
          <ListItem button onClick={() => onClick('/report/sku-details-report')}>
            <ListItemText primary="SKU Details Report" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/stock-report')}>
            <ListItemText primary="Stock Report" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/location-report')}>
            <ListItemText primary="Location Report" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/dashboard-report')}>
            <ListItemText primary="Dashboard Report" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/stock-ageing-report-and-dispatch')}>
            <ListItemText primary="Stock Ageing Report & Dispatch" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/sku-wise-dispatch-report')}>
            <ListItemText primary="SKU wise Dispatch Report" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/truck-wise-loading-report')}>
            <ListItemText primary="Truck wise Loading report" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/truck-loading-tat-report')}>
            <ListItemText primary="Truck Loading TAT Report" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/sku-wise-stock')}>
            <ListItemText primary="SKU wise Stock" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/doc-wise-outfeed-report')}>
            <ListItemText primary="Doc wise Outfeed Report" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/empty-palette-stack-infeed-report')}>
            <ListItemText primary="Empty palette stack infeed report" />
          </ListItem>
          <ListItem button onClick={() => onClick('/report/partial-palette-infeed-report')}>
            <ListItemText primary="Partial palette infeed report" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
export const SystemSettingsMenuItem = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            <SettingsRoundedIcon />
          </ListItemIcon>
          <ListItemText> SYSTEM SETTINGS</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Add your sub-items here */}
          <ListItem button onClick={() => onClick('/systemsettings/manage-accesscontrol')}>
            <ListItemText primary="Manage Access control" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
export const MonitorMenuItem = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            <MonitorRoundedIcon />
          </ListItemIcon>
          <ListItemText> MONITOR</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Add your sub-items here */}
          <ListItem button onClick={() => onClick('/monitor/infeed-outfeed-statistics')}>
            <ListItemText primary="Infeed Outfeed Statistics" />
          </ListItem>
          <ListItem button onClick={() => onClick('/monitor/lock-activity')}>
            <ListItemText primary="Lock Activity" />
          </ListItem>
          <ListItem button onClick={() => onClick('/monitor/logger-activity')}>
            <ListItemText primary="Logger Activity" />
          </ListItem>
          <ListItem button onClick={() => onClick('/monitor/fault-history')}>
            <ListItemText primary="Fault History" />
          </ListItem>
          <ListItem button onClick={() => onClick('/monitor/infeed-live')}>
            <ListItemText primary="Infeed. LIVE" />
          </ListItem>
          <ListItem button onClick={() => onClick('/monitor/outfeed-live')}>
            <ListItemText primary="Outfeed. LIVE" />
          </ListItem>
          <ListItem button onClick={() => onClick('/monitor/mb-sensor-ip-op-signal')}>
            <ListItemText primary="MB Sensor IP/OP Signal" />
          </ListItem>
          <ListItem button onClick={() => onClick('/monitor/manage-dms-decision-point')}>
            <ListItemText primary="Manage DMS Decision Point" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
export const DmsMenuItem = ({ onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemIcon>
            <DocumentScannerRoundedIcon />
          </ListItemIcon>
          <ListItemText> DMS</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Add your sub-items here */}
          <ListItem button onClick={() => onClick('/dms/dms-manage-user')}>
            <ListItemText primary="Manage User" />
          </ListItem>
          <ListItem button onClick={() => onClick('/dms/dms-manage-product')}>
            <ListItemText primary="Manage Product" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};