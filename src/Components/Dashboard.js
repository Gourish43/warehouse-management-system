import * as React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, CssBaseline, Divider, List } from '@mui/material';
import FloorVisualize from './FloorVisual/FloorVisualize';
import { FloorMenuItem, ControlMenuItem, MasterMenuItem, ReportMenuItem, SystemSettingsMenuItem, MonitorMenuItem, DmsMenuItem } from './Menuitem';

import FloorWiseProductPriority from './Control/FloorWiseProductPriority';
import RunTimeMachineInfeed from './Control/RunTimeMachineInfeed';
import RunTimeMachineOutfeed from './Control/RunTimeMachineOutfeed';
import ZotbDetails from './Control/ZotbDetails';
import EquipmentControl from './Control/EquipmentControl';
import ManageLocation from './Control/ManageLocation';
import ManageStockAndDispatch from './Control/ManageStockAndDispatch';

import BatchModification from './Master/BatchModification';
import ManageDmsDecisionPoint from './Master/ManageDmsDecisionPoint';
import ManageDmsDock from './Master/ManageDmsDock';
import ManageDmsEquipmentDetails from './Master/ManageDmsEquipmentDetails';
import ManageDmsPosition from './Master/ManageDmsPosition';
import ManageDmsPositionTagDetails from './Master/ManageDmsPositionTagDetails';
import ManageDmsStacker from './Master/ManageDmsStacker';
import ManageLoadingBayOutfeedPalette from './Master/ManageLoadingBayOutfeedPalette';
import ManageProduct from './Master/ManageProduct';
import ManageSku from './Master/ManageSku';
import ManageRole from './Master/ManageRole';
import ManageUser from './Master/ManageUser';
import UploadEquipmentAlarm from './Master/UploadEquipmentAlarm';
import ViewEquipmentAlarm from './Master/ViewEquipementAlarm';

import DashboardReport from './Report/DashboardReport';
import DocWiseOutfeedReport from './Report/DocWiseOutfeedReport';
import EmptyPaletteStackInfeedReport from './Report/EmptyPaletteStackInfeedReport';
import LocationReport from './Report/LocationReport';
import PartialPaletteInfeedReport from './Report/PartialPaletteInfeedReport';
import SkuDetailsReport from './Report/SkuDetailsReport';
import SkuWiseDispatchReport from './Report/SkuWiseDispatchReport';
import SkuWiseStock from './Report/SkuWiseStock';
import StockAgeingReportAndDispatch from './Report/StockAgeingReportAndDispatch';
import StockReport from './Report/StockReport';
import TruckLoadingTatReport from './Report/TruckLoadingTatReport';
import TruckWiseLoadingReport from './Report/TruckWiseLoadingReport';

import ManageAccessControl from './SystemSettings/ManageAccessControl';

import FaultHistory from './Monitor/FaultHistory';
import InfeedLive from './Monitor/InfeedLive';
import InfeedOutfeedStatistic from './Monitor/InfeedOutfeedStatistic';
import LockActivity from './Monitor/LockActivity';
import LoggerActivity from './Monitor/LoggerActivity';
import OutfeedLive from './Monitor/OutfeedLive';
import MonitorManageDmsDecisionPoint from './Monitor/MonitorManageDmsDecisionPoint';
import MbSensorIpOpsignal from './Monitor/MbSensorIpOpSignal';

import DmsManageProduct from './DMS/DmsManageProduct';
import DmsManageUser from './DMS/DmsManageUser';
const drawerWidth = 320;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    backgroundColor: '#000080',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function ResponsiveDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    // Perform logout logic here
    navigate('/login');
    
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <FloorMenuItem onClick={() => navigate("/dashboard")} />
        <ControlMenuItem onClick={(route) => navigate(route)} />
        <MasterMenuItem onClick={(route) => navigate(route)} />
        <ReportMenuItem onClick={(route) => navigate(route)} />
        <SystemSettingsMenuItem onClick={(route) => navigate(route)} />
        <MonitorMenuItem onClick={(route) => navigate(route)} />
        <DmsMenuItem onClick={(route) => navigate(route)} />

      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          SMART WAREHOUSE MANAGEMENT SYSTEM
          </Typography>
          <Button color="inherit" variant='h6' onClick={handleLogout} sx={{ marginLeft: 'auto' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
        
        <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
          {drawer}
        </Drawer>
       
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <DrawerHeader />
        <Toolbar />
        <Routes>
          <Route path="/dashboard" element={<FloorVisualize />} />

          <Route path="/control/floor-wise-product-priority" element={<FloorWiseProductPriority />} />
          <Route path="/control/runtime-machine-infeed" element={<RunTimeMachineInfeed />} />
          <Route path="/control/runtime-machine-outfeed" element={<RunTimeMachineOutfeed />} />
          <Route path="/control/zotb-details" element={<ZotbDetails />} />
          <Route path="/control/equipment-control" element={<EquipmentControl />} />
          <Route path="/control/manage-location" element={<ManageLocation />} />
          <Route path="/control/manage-stock-and-dispatch" element={<ManageStockAndDispatch />} />

          <Route path="/master/batch-modification" element={<BatchModification />} />
          <Route path="/master/manage-dms-decision-point" element={<ManageDmsDecisionPoint />} />
          <Route path="/master/manage-dms-dock" element={<ManageDmsDock />} />
          <Route path="/master/manage-dms-equipment-details" element={<ManageDmsEquipmentDetails />} />
          <Route path="/master/manage-dms-position" element={<ManageDmsPosition />} />
          <Route path="/master/manage-dms-position-tag-details" element={<ManageDmsPositionTagDetails />} />
          <Route path="/master/manage-dms-stacker" element={<ManageDmsStacker />} />
          <Route path="/master/manage-loading-bay-outfeed-palette" element={<ManageLoadingBayOutfeedPalette />} />
          <Route path="/master/manage-product" element={<ManageProduct />} />
          <Route path="/master/manage-role" element={<ManageRole />} />
          <Route path="/master/manage-product" element={<ManageProduct />} />
          <Route path="/master/manage-sku" element={<ManageSku />} />
          <Route path="/master/manage-user" element={<ManageUser />} />
          <Route path="/master/upload-equipment-alarm" element={<UploadEquipmentAlarm />} />
          <Route path="/master/view-equipment-alarm" element={<ViewEquipmentAlarm />} />

          <Route path="/report/dashboard-report" element={<DashboardReport />} />
          <Route path="/report/doc-wise-outfeed-report" element={<DocWiseOutfeedReport />} />
          <Route path="/report/empty-palette-stack-infeed-report" element={<EmptyPaletteStackInfeedReport />} />
          <Route path="/report/location-report" element={<LocationReport />} />
          <Route path="/report/partial-palette-infeed-report" element={<PartialPaletteInfeedReport />} />
          <Route path="/report/sku-wise-dispatch-report" element={<SkuWiseDispatchReport />} />
          <Route path="/report/sku-details-report" element={<SkuDetailsReport />} />
          <Route path="/report/sku-wise-stock" element={<SkuWiseStock />} />
          <Route path="/report/stock-ageing-report-and-dispatch" element={<StockAgeingReportAndDispatch />} />
          <Route path="/report/stock-report" element={<StockReport />} />
          <Route path="/report/truck-loading-tat-report" element={<TruckLoadingTatReport />} />
          <Route path="/report/truck-wise-loading-report" element={<TruckWiseLoadingReport />} />

          <Route path="/systemSettings/manage-accesscontrol" element={<ManageAccessControl />} />

          <Route path="/monitor/fault-history" element={<FaultHistory />} />
          <Route path="/monitor/infeed-live" element={<InfeedLive />} />
          <Route path="/monitor/infeed-outfeed-statistics" element={<InfeedOutfeedStatistic />} />
          <Route path="/monitor/lock-activity" element={<LockActivity />} />
          <Route path="/monitor/logger-activity" element={<LoggerActivity />} />
          <Route path="/monitor/manage-dms-decision-point" element={<MonitorManageDmsDecisionPoint />} />
          <Route path="/monitor/mb-sensor-ip-op-signal" element={<MbSensorIpOpsignal />} />
          <Route path="/monitor/outfeed-live" element={<OutfeedLive />} />

          <Route path="/dms/dms-manage-user" element={<DmsManageUser />} />
          <Route path="/dms/dms-manage-product" element={<DmsManageProduct />} />

        </Routes>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;