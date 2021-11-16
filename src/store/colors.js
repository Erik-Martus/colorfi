import themeLib from '../data/themes.json';
import { genColorId, genHex, initColors, genShades } from '../js/colorFuncs';

const initialCount = 5;

const initialState = {
  colors: initColors(initialCount),
  colorCount: initialCount + 1,
  themes: themeLib,
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLOR_ADDED: {
      const id = genColorId();
      const name = `color${state.colorCount}`;
      return {
        ...state,
        colors: {
          ...state.colors,
          [id]: {
            id: id,
            name: name,
            hex: genHex(),
            shades: false,
            locked: false,
          },
        },
        colorCount: state.colorCount + 1,
      };
    }
    case COLOR_DELETED: {
      const { [action.payload]: remove, ...remainingColors } = state.colors;
      return { ...state, colors: remainingColors };
    }
    case COLOR_SHADES_TOGGLED:
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.payload.id]: {
            ...state.colors[action.payload.id],
            shades: {
              ...state.colors[action.payload.id].shades,
              enabled: action.payload.value,
            },
          },
        },
      };
    case COLOR_SHADES_UPDATED: {
      console.log(action.payload);
      let color = state.colors[action.payload.id];
      const props = Object.keys(action.payload.value);
      const values = Object.values(action.payload.value);
      props.map((prop, index) => {
        color.shades[prop] = values[index];
      });
      color.shades.colors = genShades(
        isNaN(color.shades.amount)
          ? { ...color, shades: { ...color.shades, amount: 1, baseIndex: 1 } }
          : color
      );
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.payload.id]: color,
        },
      };
    }
    case COLOR_UPDATED: {
      let color = state.colors[action.payload.id];
      const props = Object.keys(action.payload.value);
      const values = Object.values(action.payload.value);
      props.map((prop, index) => {
        color[prop] = values[index];
      });
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.payload.id]: color,
        },
      };
    }
    case COLORS_RANDOMIZED: {
      let colors = { ...state.colors };
      Object.keys(colors).map((color) => {
        if (!colors[color].locked) {
          colors[color].hex = genHex();
          colors[color].shades = false;
        }
      });
      console.log(colors);
      return { ...state, colors: colors };
    }
    case THEME_CHANGED:
      return {
        ...state,
        colors: themeLib[action.payload].colors,
      };
    default:
      return state;
  }
};

export default colorReducer;

// selectors
export const getColors = (state) => {
  return state.present.colors;
};
export const getThemes = (state) => state.present.themes;
export const getPast = (state) => state.past;
export const getPresent = (state) => state.present;
export const getFuture = (state) => state.future;

// action types
const COLOR_ADDED = 'color/colorAdd';
const COLOR_DELETED = 'color/colorDelete';
const COLOR_UPDATED = 'color/colorUpdate';
const COLORS_RANDOMIZED = 'color/colorsRandomized';
const COLOR_SHADES_TOGGLED = 'color/colorShadesToggled';
const COLOR_SHADES_UPDATED = 'color/colorShadesUpdated';
const THEME_CHANGED = 'color/themeChange';

// action creators
export const changeTheme = (theme) => ({
  type: THEME_CHANGED,
  payload: theme,
});

export const addColor = () => ({
  type: COLOR_ADDED,
});

export const deleteColor = (id) => ({
  type: COLOR_DELETED,
  payload: id,
});

export const updateColor = (id, value) => ({
  type: COLOR_UPDATED,
  payload: { id, value },
});

export const randomizeColors = () => ({
  type: COLORS_RANDOMIZED,
});

export const toggleColorShades = (id, value) => ({
  type: COLOR_SHADES_TOGGLED,
  payload: { id, value },
});

export const updateColorShades = (id, value) => ({
  type: COLOR_SHADES_UPDATED,
  payload: { id, value },
});
