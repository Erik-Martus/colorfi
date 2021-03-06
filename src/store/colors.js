import { genColorId, genHex, initColors } from '../js/colorFuncs';

const initialState = initColors(5);

for (let index = 0; index < 20; index++) {
  console.log(genColorId());
}

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLOR_ADDED: {
      const id = genColorId();
      return {
        ...state,
        [id]: {
          id: id,
          name: action.payload,
          hex: genHex(),
          shades: false,
          locked: false,
        },
      };
    }
    case COLOR_DELETED: {
      const { [action.payload]: remove, ...remainingColors } = state;
      return remainingColors;
    }
    case COLOR_UPDATED: {
      let color = { ...state[action.payload.id] };
      Object.entries(action.payload.value).map(
        (item) => (color[item[0]] = item[1])
      );
      return {
        ...state,
        [action.payload.id]: color,
      };
    }
    case COLORS_RANDOMIZED: {
      let colors = {};
      Object.keys(state).forEach((color) => {
        if (!state[color].locked) {
          colors[color] = { ...state[color], hex: genHex(), shades: false };
        }
      });
      return {
        ...state,
        ...colors,
      };
    }
    case THEME_CHANGED:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default colorReducer;

// selectors
export const getColors = (state) => state.present;
export const getPast = (state) => state.past;
export const getFuture = (state) => state.future;

// action types
const COLOR_ADDED = 'color/colorAdd';
const COLOR_DELETED = 'color/colorDelete';
const COLOR_UPDATED = 'color/colorUpdate';
const COLORS_RANDOMIZED = 'color/colorsRandomized';
const THEME_CHANGED = 'color/themeChange';

// action creators
export const changeTheme = (theme) => ({
  type: THEME_CHANGED,
  payload: theme,
});

export const addColor = (name) => ({
  type: COLOR_ADDED,
  payload: name,
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
