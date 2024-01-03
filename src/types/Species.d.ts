export default interface Species {
  version?: string;
  name?: string;
  sname?: string;
  form?: string;
  nationalPokedexNumber?: number;
  baseStats?: Stats;
  maleRatio?: number;
  catchRate?: number;
  baseScale?: number;
  baseExperienceYield?: number;
  baseFriendship?: number;
  evYield?: Stats;
  experienceGroup?: string;
  hitbox?: Hitbox;
  primaryType?: string;
  secondaryType?: string;
  abilities?: Ability[];
  shoulderMountable?: boolean;
  moves?: Move[];
  features?: string[];
  behaviour?: {
    resting?: {
      canSleep?: boolean;
      times?: string;
      sleepChange?: number;
      blocks?: string[];
      biomes?: string[];
      light?: string;
      depth?: string;
      willSleepOnBed?: boolean;
    };
    moving?: {
      walk?: {
        canWalk?: boolean;
        avoidsLand?: boolean;
        walkSpeed?: number;
      };
      swim?: {
        avoidsWater?: boolean;
        hurtByLava?: boolean;
        canSwimInWater?: boolean;
        canSwimInLava?: boolean;
        swimSpeed?: number;
        canBreatheUnderwater?: boolean;
        canBreatheUnderlava?: boolean;
        canWalkOnWater?: boolean;
        canWalkOnLava?: boolean;
      };
      fly?: {
        canFly?: boolean;
        flySpeedHorizontal?: number;
      };
      wanderChance?: number;
      wanderSpeed?: number;
      canLook?: boolean;
      looksAtEntities?: boolean;
    };
    idle?: {
      pointsAtSpawn?: boolean;
    };
  };
  pokedex?: string[];
  drops?: {
    entries?: DropEntry[];
    amount?: string;
  };
  eggCycles?: number;
  eggGroups?: string[];
  dynamaxBlocked?: boolean;
  implemented?: boolean;
  height?: number;
  weight?: number;
  labels?: string[];
  preEvolution?: string;
  battleOnly?: boolean;
}

export interface DropEntry {
  percentage?: number;
  quantity?: number;
  maxSelectableTimes?: number;
  item?: string;
  quantityRange?: string;
  nbt?: string;
}

export interface Move {
  name?: string;
  source?: string;
  level?: number;
}

export interface Ability {
  name?: string;
  hidden?: boolean;
}

export interface Hitbox {
  width?: number;
  height?: number;
  fixed?: boolean;
}

export interface Stats {
  hp?: number;
  attack?: number;
  defence?: number;
  special_attack?: number;
  special_defence?: number;
  speed?: number;
}
