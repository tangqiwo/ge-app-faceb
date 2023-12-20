/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-16 13:11:56
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/constants/menus/gameMenu.ts
 * @Description: 第三方游戏
 */

import _ from 'lodash';

export const GAMES: any = {
  ['im']: {
    name: '巨像金业',
    alias: 'IM',
    key: 'im',
    forward: {
      'sport': {
        route: 'AsSports'
      }
    }
  },
  ['fbxc']: {
    name: '巨像金业',
    alias: 'FBXC',
    key: 'fbxc',
    forward: {
      'sport': {
        route: 'FBXCSport'
      }
    }
  },
  ['pt']: {
    id: 1,
    name: 'PT娱乐',
    alias: 'PT',
    key: 'pt',
    needTransfer: true,
    forward: {
      'casino': {
        route: 'GameFrame',
        params: { playURL: `ptgame/livehallplay` }
      },
      'slot': {
        route: 'GameHall',
        params: { playURL: 'ptgame/play/$?ish5=1&autoThrad', cateId: 4 }
      }
    }
  },
  ['bbin']: {
    id: 2,
    name: 'BBIN娱乐',
    alias: 'BBIN',
    key: 'bbin',
    needTransfer: true,
    forward: {
      'casino': {
        route: 'GameFrame',
        params: { playURL: `livegame/tobbinpage/live` }
      },
      'slot': {
        route: 'GameHall',
        params: { playURL: 'livegame/bbinplay/$?autoThrad', cateId: 11 }
      }
    }
  },
  ['ag']: {
    id: 3,
    name: 'AG娱乐',
    alias: 'AG',
    key: 'ag',
    forward: {
      'slot': {
        route: 'GameFrame',
        params: { name: 'AG电子', playURL: 'aggame/electronicplay?autoThrad', cateId: 46 }
      },
      'casino': {
        route: 'GameFrame',
        params: { name: 'AG真人', playURL: 'aggame/hallplay?autoThrad' }
      },

    }
  },

  ['agFishing']: {
    id: 3,
    name: 'AG街机捕鱼',
    alias: 'AG',
    key: 'ag',
    needTransfer: true,
    forward: {
      'fishing': {
        route: 'GameFrame',
        params: { name: 'AG捕鱼', playURL: 'aggame/fishplay?autoThrad' }
      }
    }
  },
  ['agArcade']: {
    id: 3,
    name: 'AG街机',
    alias: 'AGARCADE',
    key: 'ag',
    forward: {
      'slot': {
        route: 'GameFrame',
        params: { name: 'AG街机', playURL: 'aggame/yoplay?autoThrad' }
      }
    }
  },
  ['kgame']: {
    name: 'KGAME娱乐',
    key: 'kgame',
    alias: 'KGAME',
    forward: {
      'chess': {
        route: 'KGameHall',
      }
    }
  },
  ['obg']: {
    name: 'PM体育',
    alias: 'OBG',
    key: 'obg',
    forward: {
      'sport': {
        route: 'GameFrame'
      },
      'app-sport': {
        route: 'OBGSport'
      }
    }
  },
  ['ibc']: {
    name: '沙巴体育',
    alias: 'IBC',
    key: 'ibc',
    forward: {
      'sport': {
        route: 'GameFrame',
        params: { name: '沙巴体育', playURL: 'ibcgame?s=1&autoThrad' }
      }
    }
  },
  ['au']: {
    name: 'AUG娱乐',
    alias: 'AU',
    key: 'au',
    forward: {
      'chess': {
        route: 'AUGameHall',
      }
    }
  },
  ['bc']: {
    name: 'BC娱乐',
    alias: 'BC',
    key: 'bc',
    forward: {
      'sport': {
        route: 'GameFrame'
      }
    }
  },
  ['cq9']: {
    name: 'CQ9娱乐',
    alias: 'CQ9',
    key: 'cq9',
    forward: {
      'slot': {
        route: 'GameFrame',
        params: { playURL: 'cqninegame/play' }
      }
    }
  },
  ['jdb']: {
    name: 'JDB娱乐',
    alias: 'JDB',
    key: 'jdb',
    forward: {
      'slot': {
        route: 'GameFrame',
        params: { playURL: 'jdbgame/play' }
      }
    }
  },
  ['bgzr']: {
    name: 'BG真人',
    alias: 'BGZR',
    key: 'bgzr',
    forward: {
      'casino': {
        route: 'GameFrame',
      }
    }
  },
  ['yy']: {
    name: '云游棋牌',
    alias: 'YY',
    key: 'yy',
    needTransfer: true,
    forward: {
      'chess': {
        route: 'GameFrame',
        params: { playURL: 'yygame/play?autoThrad' }
      }
    }
  },
  ['fb']: {
    name: 'FB体育',
    alias: 'FB',
    key: 'fb',
    forward: {
      'sport': {
        route: 'GameFrame'
      },
      'app-sport': {
        route: 'FBSport'
      }
    }
  },
  ['lh']: {
    name: '雷火电竞',
    alias: 'LH',
    key: 'lh',
    forward: {
      'esports': {
        route: 'GameFrame',
        params: { playURL: `lhgame/play` }
      }
    }
  },
  ['imone']: {
    name: 'IM娱乐',
    alias: 'IMONE',
    key: 'imone',
    forward: {
      'esports': {
        route: 'GameFrame',
        params: { gameId: 2758 }
      },
      'sport': {
        route: 'GameFrame',
        params: { gameId: 2757 }
      }
    }
  },
  ['obgzr']: {
    name: 'PM真人',
    alias: 'OBGZR',
    key: 'obgzr',
    forward: {
      'casino': {
        route: 'GameFrame'
      }
    }
  },
  ['obgqp']: {
    name: 'PM棋牌',
    alias: 'OBGQP',
    key: 'obgqp',
    needTransfer: true,
    forward: {
      'chess': {
        route: 'GameFrame'
      }
    }
  },
  ['sg']: {
    name: 'SG捕鱼',
    key: 'sg',
    alias: 'SG',
    forward: {
      'fishing': {
        route: 'GameFrame',
        params: { playURL: 'sggame/play/1719?autoThrad' }
      }
    }
  },
  ['mg']: {
    id: 33,
    name: 'MG电子',
    key: 'mg',
    alias: 'MG',
    forward: {
      'slot': {
        route: 'GameHall',
        params: { cateId: 60 }
      }
    }
  },
  ['ky']: {
    name: 'KY棋牌',
    key: 'ky',
    alias: 'KY',
    forward: {
      'chess': {
        route: 'GameFrame',
        params: { playURL: `kygame/play` }
      }
    }
  },
  ['caipao']: {
    name: '彩票',
    key: 'caipao',
    alias: 'CAIPAO',
    forward: {
      'lottery': {
        route: 'Lottery'
      }
    }
  },
  ['obgdj']: {
    name: 'PM电竞',
    key: 'obgdj',
    alias: 'OBGDJ',
    needTransfer: true,
    forward: {
      'esports': {
        route: 'GameFrame'
      }
    }
  },
  ['avia']: {
    name: '泛亚电竞',
    key: 'avia',
    alias: 'AVIA',
    forward: {
      'esports': {
        route: 'GameFrame',
        params: { playURL: `aviagame/play?autoThrad` }
      }
    }
  },
  ['pp']: {
    id: 34,
    name: 'PP电子',
    key: 'pp',
    alias: 'PP',
    forward: {
      'slot': {
        route: 'GameHall',
        params: { playURL: 'ppgame/play/$', cateId: 65 }
      }
    }
  },
  ['pg']: {
    id: 19,
    name: 'PG电子',
    key: 'pg',
    alias: 'PG',
    forward: {
      'slot': {
        route: 'GameHall',
        params: { playURL: 'pggame/play/$' }
      }
    }
  }


}



interface IGames {
  games: any;
  gameMenus?: any
}
export const makeGameMenus = ({games, gameMenus = GAMES}: IGames) => {
  let result: any = [];
  _.each(games, (item: any) => {
    result.push({...item, games: _.map(item.games, (it) => ({...gameMenus[it], cate: item.cate, cateName: item.name, unionKey: it, unionId: _.uniqueId('gameId_')}))});
  })
  return result;
};


// TAG 有 H5 问题的 Frame: PM 体育 PM 真人 IM 电竞