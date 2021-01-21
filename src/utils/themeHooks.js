import { useMediaQuery, useTheme } from '@material-ui/core';

export const useIsXSDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('xs'));
};

export const useIsSMDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

export const useIsMDDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};

export const useIsLGDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('lg'));
};
