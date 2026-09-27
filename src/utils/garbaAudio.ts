/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Authentic Gujarati Garba Songs & Melodic Audio Engine.
 * Features note-by-note melodic synthesis for iconic Garba songs:
 * - "Chogada Tara" (Darshan Raval)
 * - "Sanedo Sanedo" (Mani Raj Barot)
 * - "Dholida Dhol Re Vagad" (Falguni Pathak)
 * - "Pankhida Tu Ude Ne Jaje Pavagadh" (Hemant Chauhan)
 * - "Tara Vina Shyam Mane Ekla Re Lage" (Traditional Raas)
 * - "Pethalpur Ma Pavo Vagyo" (Kinjal Dave)
 * - "Mor Bani Thanghat Kare" (Osman Mir)
 * - "Odhani Odhu Odhu Ne Udi Jaye" (Falguni Pathak)
 *
 * Includes Harmonium dual-reed synthesis, Bansuri bamboo flute, Shehnai brass lead,
 * Tanpura grounding drone, authentic Dhol/Dholak/Taali/Dandiya percussion backing,
 * vocal cheer chants ("Haalo!", "Hey!"), and synchronized Karaoke lyrics engine.
 * Plus support for live Gujarati Garba radio & audio stream playback.
 */

export interface GarbaLyricLine {
  id: number;
  gujarati: string;
  english: string;
}

export interface GarbaMelodyNote {
  note: string; // e.g. "G4", "A4", "B4", "C5", "REST"
  beats: number; // Duration in beats (1 = 1 beat, 0.5 = 8th note, 0.25 = 16th)
  lyric?: string;
  accent?: boolean;
}

export interface GarbaSong {
  id: string;
  title: string;
  gujaratiTitle: string;
  artist: string;
  tag: string;
  rhythmStyle: '3-taali' | 'dodhiya' | 'sanedo' | 'dandiya-raas' | 'khelaiya';
  defaultBpm: number;
  leadInstrument: 'harmonium' | 'bansuri' | 'shehnai';
  keyRoot: string;
  lyrics: GarbaLyricLine[];
  melody: GarbaMelodyNote[];
  vocalChants: string[];
}

export const NOTE_FREQS: Record<string, number> = {
  'REST': 0,
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99,
  'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99,
  'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
  'C6': 1046.50
};

export const GARBA_SONGS: GarbaSong[] = [
  {
    id: 'chogada-tara',
    title: 'Chogada Tara',
    gujaratiTitle: 'ચોગડા તારા (લવયાત્રી)',
    artist: 'Darshan Raval & Asees Kaur',
    tag: 'Global Garba Anthem • Dodhiya 2-Step',
    rhythmStyle: 'dodhiya',
    defaultBpm: 118,
    leadInstrument: 'harmonium',
    keyRoot: 'G4',
    vocalChants: ['Haalo Re Haalo!', 'Ae Hey!', 'Chalo Garbe Ramva!'],
    lyrics: [
      { id: 1, gujarati: 'ચોગડા તારા છબીલો તારા રંગીલો તારા...', english: 'Chogada tara, chhabilo tara, rangeelo tara...' },
      { id: 2, gujarati: 'રંગભેરુ જુએ તારી વાટ રે, હે આવજો આવજો...', english: 'Rangbheru jue tari vaat re, he aavjo aavjo...' },
      { id: 3, gujarati: 'તારા વિના શ્યામ મને એકલડું લાગે...', english: 'Tara vina shyam mane ekla re lage...' },
      { id: 4, gujarati: 'હાલો રે હાલો ગરબે ઘૂમવા આવજો રે!', english: 'Halo re halo garbe ghumva aavjo re!' }
    ],
    melody: [
      // Chorus: Cho-ga-da ta-ra
      { note: 'G4', beats: 0.5, lyric: 'Cho' },
      { note: 'G4', beats: 0.5, lyric: 'ga' },
      { note: 'A4', beats: 0.5, lyric: 'da' },
      { note: 'B4', beats: 1.0, lyric: 'ta-ra', accent: true },
      // Chha-bi-lo ta-ra
      { note: 'B4', beats: 0.5, lyric: 'chha' },
      { note: 'A4', beats: 0.5, lyric: 'bi' },
      { note: 'G4', beats: 0.5, lyric: 'lo' },
      { note: 'A4', beats: 1.0, lyric: 'ta-ra', accent: true },
      // Ran-gee-lo ta-ra
      { note: 'G4', beats: 0.5, lyric: 'ran' },
      { note: 'G4', beats: 0.5, lyric: 'gee' },
      { note: 'A4', beats: 0.5, lyric: 'lo' },
      { note: 'B4', beats: 1.0, lyric: 'ta-ra', accent: true },
      // Rang-bhe-ru ju-e ta-ri vaat re
      { note: 'D5', beats: 0.5, lyric: 'rang' },
      { note: 'C5', beats: 0.5, lyric: 'bhe' },
      { note: 'B4', beats: 0.5, lyric: 'ru' },
      { note: 'A4', beats: 0.5, lyric: 'ju-e' },
      { note: 'G4', beats: 0.5, lyric: 'ta-ri' },
      { note: 'F#4', beats: 0.5 },
      { note: 'G4', beats: 1.5, lyric: 'vaat re', accent: true },
      // He aav-jo aav-jo
      { note: 'B4', beats: 0.5, lyric: 'he' },
      { note: 'C5', beats: 0.5, lyric: 'aav' },
      { note: 'D5', beats: 1.0, lyric: 'jo', accent: true },
      { note: 'D5', beats: 0.5, lyric: 'aav' },
      { note: 'C5', beats: 0.5, lyric: 'jo' },
      // Ta-ra vi-na shyam ma-ne ek-la re la-ge
      { note: 'B4', beats: 0.5, lyric: 'ta' },
      { note: 'A4', beats: 0.5, lyric: 'ra' },
      { note: 'G4', beats: 0.5, lyric: 'vi-na' },
      { note: 'A4', beats: 0.5, lyric: 'shyam' },
      { note: 'B4', beats: 1.0, lyric: 'ma-ne', accent: true },
      { note: 'A4', beats: 0.5, lyric: 'ek' },
      { note: 'G4', beats: 0.5, lyric: 'la' },
      { note: 'E4', beats: 0.5, lyric: 're' },
      { note: 'D4', beats: 1.5, lyric: 'la-ge', accent: true },
      { note: 'REST', beats: 0.5 }
    ]
  },
  {
    id: 'sanedo',
    title: 'Sanedo Sanedo',
    gujaratiTitle: 'સનેડો સનેડો (લાલ લાલ)',
    artist: 'Mani Raj Barot (Folk Legend)',
    tag: 'Kathiyawadi Cult Classic • High Energy',
    rhythmStyle: 'sanedo',
    defaultBpm: 134,
    leadInstrument: 'shehnai',
    keyRoot: 'D4',
    vocalChants: ['Sanedo Sanedo!', 'Arrey Lala Re Lala!', 'Jiyo Kathiyawadi!'],
    lyrics: [
      { id: 1, gujarati: 'સનેડો સનેડો, લાલ લાલ સનેડો...', english: 'Sanedo sanedo, lal lal sanedo...' },
      { id: 2, gujarati: 'અંબે માના ચોકમાં રમીએ સનેડો...', english: 'Ambe maana chowk ma ramiye sanedo...' },
      { id: 3, gujarati: 'હે લાલા રે લાલા, કાચી રે કેરી ને સનેડો...', english: 'He lala re lala, kachi re keri ne sanedo...' },
      { id: 4, gujarati: 'સનેડો સનેડો, અમદાવાદ ચોકમાં સનેડો!', english: 'Sanedo sanedo, Amdavad chowk ma sanedo!' }
    ],
    melody: [
      // Sa-ne-do sa-ne-do
      { note: 'A4', beats: 0.5, lyric: 'Sa' },
      { note: 'A4', beats: 0.5, lyric: 'ne' },
      { note: 'F#4', beats: 0.5, lyric: 'do' },
      { note: 'G4', beats: 0.5, lyric: 'sa' },
      { note: 'A4', beats: 1.0, lyric: 'ne-do', accent: true },
      // Lal lal sa-ne-do
      { note: 'B4', beats: 0.5, lyric: 'lal' },
      { note: 'B4', beats: 0.5, lyric: 'lal' },
      { note: 'A4', beats: 0.5, lyric: 'sa' },
      { note: 'G4', beats: 0.5, lyric: 'ne' },
      { note: 'F#4', beats: 1.0, lyric: 'do', accent: true },
      // Am-be ma-na chowk ma
      { note: 'F#4', beats: 0.5, lyric: 'am' },
      { note: 'G4', beats: 0.5, lyric: 'be' },
      { note: 'A4', beats: 0.5, lyric: 'ma-na' },
      { note: 'A4', beats: 1.0, lyric: 'chowk ma', accent: true },
      // Ra-mi-ye sa-ne-do
      { note: 'G4', beats: 0.5, lyric: 'ra' },
      { note: 'F#4', beats: 0.5, lyric: 'mi' },
      { note: 'E4', beats: 0.5, lyric: 'ye' },
      { note: 'D4', beats: 1.5, lyric: 'sa-ne-do', accent: true },
      // He la-la re la-la
      { note: 'D5', beats: 0.75, lyric: 'he' },
      { note: 'D5', beats: 0.5, lyric: 'la-la' },
      { note: 'B4', beats: 0.5, lyric: 're' },
      { note: 'A4', beats: 1.0, lyric: 'la-la', accent: true },
      // Ka-chi re ke-ri ne sa-ne-do
      { note: 'A4', beats: 0.5, lyric: 'ka' },
      { note: 'B4', beats: 0.5, lyric: 'chi' },
      { note: 'A4', beats: 0.5, lyric: 'ke-ri' },
      { note: 'G4', beats: 0.5, lyric: 'ne' },
      { note: 'F#4', beats: 0.5, lyric: 'sa' },
      { note: 'E4', beats: 0.5, lyric: 'ne' },
      { note: 'D4', beats: 1.5, lyric: 'do!', accent: true },
      { note: 'REST', beats: 0.5 }
    ]
  },
  {
    id: 'dholida',
    title: 'Dholida Dhol Re Vagad',
    gujaratiTitle: 'ઢોલીડા ઢોલ રે વગાડ',
    artist: 'Falguni Pathak (Dandiya Queen)',
    tag: 'Eternal Navratri Classic • 3-Taali Heritage',
    rhythmStyle: '3-taali',
    defaultBpm: 110,
    leadInstrument: 'harmonium',
    keyRoot: 'C4',
    vocalChants: ['Dholida Vagad!', 'Taali Pado!', 'Jai Ambe Ma!'],
    lyrics: [
      { id: 1, gujarati: 'ઢોલીડા ઢોલ રે વગાડ, મારે હીંચ લેવી છે...', english: 'Dholida dhol re vagad, mare hich levi chhe...' },
      { id: 2, gujarati: 'મારી હીંચના ઝણકારે આજે અંબે મા પધારે...', english: 'Mari hich na jhankare aaje ambe ma padhare...' },
      { id: 3, gujarati: 'ઢોલીડા ઢોલ ધીમો ધીમો ના વગાડ, તેજ વગાડ!', english: 'Dholida dhol dhimo dhimo na vagad, tej vagad!' },
      { id: 4, gujarati: 'હે રૂડી માની આસો સુદ નોરતાની રાત રે...', english: 'He rudi maani aaso sud nortaani raat re...' }
    ],
    melody: [
      // Dho-li-da dhol re va-gad
      { note: 'G4', beats: 0.5, lyric: 'Dho' },
      { note: 'G4', beats: 0.5, lyric: 'li' },
      { note: 'A4', beats: 0.5, lyric: 'da' },
      { note: 'B4', beats: 0.5, lyric: 'dhol' },
      { note: 'C5', beats: 1.0, lyric: 're', accent: true },
      { note: 'B4', beats: 0.5, lyric: 'va' },
      { note: 'A4', beats: 1.0, lyric: 'gad', accent: true },
      // Ma-re hich le-vi chhe
      { note: 'G4', beats: 0.5, lyric: 'ma' },
      { note: 'A4', beats: 0.5, lyric: 're' },
      { note: 'B4', beats: 0.5, lyric: 'hich' },
      { note: 'G4', beats: 0.5, lyric: 'le' },
      { note: 'E4', beats: 1.5, lyric: 'vi chhe', accent: true },
      // Repeat Dholida hook with variation
      { note: 'G4', beats: 0.5, lyric: 'dho' },
      { note: 'G4', beats: 0.5, lyric: 'li' },
      { note: 'A4', beats: 0.5, lyric: 'da' },
      { note: 'B4', beats: 0.5, lyric: 'dhol' },
      { note: 'C5', beats: 1.0, lyric: 're', accent: true },
      { note: 'B4', beats: 0.5, lyric: 'va' },
      { note: 'A4', beats: 1.0, lyric: 'gad' },
      // Ma-ri hich na jhan-ka-re
      { note: 'E4', beats: 0.5, lyric: 'ma' },
      { note: 'G4', beats: 0.5, lyric: 'ri' },
      { note: 'A4', beats: 0.5, lyric: 'hich' },
      { note: 'A4', beats: 0.5, lyric: 'na' },
      { note: 'A4', beats: 1.0, lyric: 'jhan-ka-re', accent: true },
      // Aa-je am-be ma padh-are
      { note: 'B4', beats: 0.5, lyric: 'aa' },
      { note: 'A4', beats: 0.5, lyric: 'je' },
      { note: 'G4', beats: 0.5, lyric: 'am' },
      { note: 'F4', beats: 0.5, lyric: 'be' },
      { note: 'E4', beats: 0.5, lyric: 'ma' },
      { note: 'D4', beats: 0.5, lyric: 'padh' },
      { note: 'C4', beats: 1.5, lyric: 'are', accent: true },
      { note: 'REST', beats: 0.5 }
    ]
  },
  {
    id: 'pankhida',
    title: 'Pankhida Tu Ude Ne Jaje',
    gujaratiTitle: 'પંખીડા તું ઉડી ને જાજે પાવાગઢ રે',
    artist: 'Hemant Chauhan (Bhakti Shiromani)',
    tag: 'Pavagadh Mahakali Bhakti • Devotional Raas',
    rhythmStyle: '3-taali',
    defaultBpm: 98,
    leadInstrument: 'bansuri',
    keyRoot: 'F4',
    vocalChants: ['Jai Mahakali Ma!', 'Pavagadh Vali Ma!', 'Garbo Ghoome!'],
    lyrics: [
      { id: 1, gujarati: 'પંખીડા તું ઉડી ને જાજે પાવાગઢ રે...', english: 'Pankhida tu ude ne jaje pavagadh re...' },
      { id: 2, gujarati: 'મહાકાળી ને જઈને કહેજે ગરબો રમે રે...', english: 'Mahakali ne jaine kaheje garbo rame re...' },
      { id: 3, gujarati: 'આસો માસો આવ્યો માડી નોરતા લઈને રે...', english: 'Aaso maaso aavyo maadi norta laine re...' },
      { id: 4, gujarati: 'ચાચરના ચોકમાં ગરબો રમે રે માડી!', english: 'Chacharna chowk ma garbo rame re maadi!' }
    ],
    melody: [
      // Pan-khi-da tu u-de ne ja-je
      { note: 'F4', beats: 0.5, lyric: 'Pan' },
      { note: 'A4', beats: 0.5, lyric: 'khi' },
      { note: 'C5', beats: 0.75, lyric: 'da' },
      { note: 'C5', beats: 0.5, lyric: 'tu' },
      { note: 'D5', beats: 0.75, lyric: 'u' },
      { note: 'C5', beats: 0.5, lyric: 'de' },
      { note: 'Bb4', beats: 0.5, lyric: 'ne' },
      { note: 'A4', beats: 1.0, lyric: 'ja-je', accent: true },
      // Pa-va-gadh re
      { note: 'G4', beats: 0.5, lyric: 'pa' },
      { note: 'A4', beats: 0.5, lyric: 'va' },
      { note: 'Bb4', beats: 0.75, lyric: 'gadh' },
      { note: 'A4', beats: 0.5, lyric: 're' },
      { note: 'G4', beats: 0.5 },
      { note: 'F4', beats: 1.5, lyric: 'e...', accent: true },
      // Ma-ha-ka-li ne jai-ne ka-he-je
      { note: 'A4', beats: 0.5, lyric: 'ma' },
      { note: 'C5', beats: 0.5, lyric: 'ha' },
      { note: 'D5', beats: 0.75, lyric: 'ka' },
      { note: 'D5', beats: 0.5, lyric: 'li' },
      { note: 'D5', beats: 0.5, lyric: 'ne' },
      { note: 'C5', beats: 0.5, lyric: 'jai' },
      { note: 'Bb4', beats: 0.5, lyric: 'ne' },
      { note: 'C5', beats: 0.75, lyric: 'ka' },
      { note: 'Bb4', beats: 0.5, lyric: 'he' },
      { note: 'A4', beats: 1.0, lyric: 'je', accent: true },
      // Gar-bo ra-me re
      { note: 'G4', beats: 0.5, lyric: 'gar' },
      { note: 'A4', beats: 0.5, lyric: 'bo' },
      { note: 'G4', beats: 0.5, lyric: 'ra' },
      { note: 'F4', beats: 1.5, lyric: 'me re', accent: true },
      { note: 'REST', beats: 0.5 }
    ]
  },
  {
    id: 'tara-vina-shyam',
    title: 'Tara Vina Shyam Mane',
    gujaratiTitle: 'તારા વિના શ્યામ મને એકલા રે લાગે',
    artist: 'Traditional Krishna Raas',
    tag: 'Soulful Krishna Raas • Melodic Dodhiya',
    rhythmStyle: 'dodhiya',
    defaultBpm: 104,
    leadInstrument: 'bansuri',
    keyRoot: 'E4',
    vocalChants: ['Radhe Radhe!', 'Shyam Aavo!', 'Dandiya Ghumo!'],
    lyrics: [
      { id: 1, gujarati: 'તારા વિના શ્યામ મને એકલા રે લાગે...', english: 'Tara vina shyam mane ekla re lage...' },
      { id: 2, gujarati: 'રાસ રમવાને વહેલો આવજે રે શ્યામ...', english: 'Raas ramva ne vahelo aavje re shyam...' },
      { id: 3, gujarati: 'મોરલીના નાદે ગોપી ઘેલી રે થઈ છે...', english: 'Morlina naade gopi gheli re thai chhe...' },
      { id: 4, gujarati: 'વૃંદાવનના ચોકમાં રાસ રમીએ રે!', english: 'Vrindavan na chowk ma raas ramiye re!' }
    ],
    melody: [
      // Ta-ra vi-na shyam ma-ne
      { note: 'B4', beats: 0.75, lyric: 'Ta' },
      { note: 'B4', beats: 0.5, lyric: 'ra' },
      { note: 'A4', beats: 0.5, lyric: 'vi' },
      { note: 'G4', beats: 0.5, lyric: 'na' },
      { note: 'F#4', beats: 0.5, lyric: 'shyam' },
      { note: 'G4', beats: 0.5, lyric: 'ma' },
      { note: 'A4', beats: 1.0, lyric: 'ne', accent: true },
      // Ek-la re la-ge
      { note: 'G4', beats: 0.5, lyric: 'ek' },
      { note: 'F#4', beats: 0.5, lyric: 'la' },
      { note: 'E4', beats: 0.5, lyric: 're' },
      { note: 'D#4', beats: 0.5 },
      { note: 'E4', beats: 1.5, lyric: 'la-ge', accent: true },
      // Raas ram-va ne va-he-lo
      { note: 'G4', beats: 0.5, lyric: 'raas' },
      { note: 'A4', beats: 0.5, lyric: 'ram' },
      { note: 'B4', beats: 0.75, lyric: 'va' },
      { note: 'B4', beats: 0.5, lyric: 'ne' },
      { note: 'C5', beats: 0.5, lyric: 'va' },
      { note: 'B4', beats: 1.0, lyric: 'he-lo', accent: true },
      // Aav-je re shyam
      { note: 'A4', beats: 0.5, lyric: 'aav' },
      { note: 'G4', beats: 0.5, lyric: 'je' },
      { note: 'F#4', beats: 0.5, lyric: 're' },
      { note: 'E4', beats: 1.5, lyric: 'shyam', accent: true },
      { note: 'REST', beats: 0.5 }
    ]
  },
  {
    id: 'pethalpur',
    title: 'Pethalpur Ma Pavo Vagyo',
    gujaratiTitle: 'પેથલપુરમાં પાવો વાગ્યો',
    artist: 'Kinjal Dave & Kirtidan Gadhvi',
    tag: 'Folk Dandiya Storm • High Octane Charan Beats',
    rhythmStyle: 'dandiya-raas',
    defaultBpm: 130,
    leadInstrument: 'shehnai',
    keyRoot: 'G4',
    vocalChants: ['He Pethalpur!', 'Dandiya Striking!', 'Haalo Re Khelaiyo!'],
    lyrics: [
      { id: 1, gujarati: 'પેથલપુરમાં પાવો વાગ્યો ને રૂડો સોનાલિયો સૂર...', english: 'Pethalpur ma pavo vagyo ne rudo sonalio sur...' },
      { id: 2, gujarati: 'હે મને કાનુડો કાની કરે, હે મને મોહનડો કાની કરે...', english: 'He mane kanudo kani kare, he mane mohando kani kare...' },
      { id: 3, gujarati: 'ગોકુળની ગોપીઓ ઘેલી રે બની છે...', english: 'Gokul ni gopio gheli re bani chhe...' },
      { id: 4, gujarati: 'દલડું મારું ઘાયલ કીધું રે કાનુડા!', english: 'Daldu maaru ghayal kidhu re kanuda!' }
    ],
    melody: [
      // Pe-thal-pur ma pa-vo va-gyo
      { note: 'D4', beats: 0.5, lyric: 'Pe' },
      { note: 'G4', beats: 0.5, lyric: 'thal' },
      { note: 'G4', beats: 0.5, lyric: 'pur' },
      { note: 'G4', beats: 0.5, lyric: 'ma' },
      { note: 'A4', beats: 0.5, lyric: 'pa' },
      { note: 'B4', beats: 0.5, lyric: 'vo' },
      { note: 'A4', beats: 0.5, lyric: 'va' },
      { note: 'G4', beats: 1.0, lyric: 'gyo', accent: true },
      // Ne ru-do so-na-li-o sur
      { note: 'B4', beats: 0.5, lyric: 'ne' },
      { note: 'C5', beats: 0.5, lyric: 'ru' },
      { note: 'D5', beats: 0.75, lyric: 'do' },
      { note: 'D5', beats: 0.5, lyric: 'so' },
      { note: 'C5', beats: 0.5, lyric: 'na' },
      { note: 'B4', beats: 0.5, lyric: 'li' },
      { note: 'A4', beats: 1.0, lyric: 'o sur', accent: true },
      // He ma-ne ka-nu-do ka-ni ka-re
      { note: 'D5', beats: 0.75, lyric: 'he' },
      { note: 'D5', beats: 0.5, lyric: 'ma' },
      { note: 'C5', beats: 0.5, lyric: 'ne' },
      { note: 'B4', beats: 0.5, lyric: 'ka' },
      { note: 'A4', beats: 0.5, lyric: 'nu' },
      { note: 'G4', beats: 0.5, lyric: 'do' },
      { note: 'F#4', beats: 0.5, lyric: 'ka' },
      { note: 'G4', beats: 1.5, lyric: 'ni ka-re', accent: true },
      { note: 'REST', beats: 0.5 }
    ]
  },
  {
    id: 'mor-bani',
    title: 'Mor Bani Thanghat Kare',
    gujaratiTitle: 'મોર બની થનગનાટ કરે',
    artist: 'Osman Mir (Ram-Leela)',
    tag: 'Folk Desert Swirl • Soulful Kathiyawadi',
    rhythmStyle: 'dandiya-raas',
    defaultBpm: 126,
    leadInstrument: 'shehnai',
    keyRoot: 'D4',
    vocalChants: ['Man Mor Bani!', 'Thanghat Kare!', 'Aabh Ma Jhabuki!'],
    lyrics: [
      { id: 1, gujarati: 'મોર બની થનગનાટ કરે, મન મોર બની થનગનાટ કરે...', english: 'Mor bani thanghat kare, man mor bani thanghat kare...' },
      { id: 2, gujarati: 'આભમાં ઝબૂકી રે વીજળી, ધરતી હરખાઈ રે...', english: 'Aabh ma jhabuki re vijli, dharti harkhai re...' },
      { id: 3, gujarati: 'ઘેરાયા વાદળ ને વરસી રે હેલી...', english: 'Gheraya vadal ne varasi re heli...' },
      { id: 4, gujarati: 'ગરબે ઘૂમવા ને મન મારું ડોલે રે!', english: 'Garbe ghumva ne man maaru dole re!' }
    ],
    melody: [
      // Mor ba-ni than-ghat ka-re
      { note: 'D4', beats: 0.5, lyric: 'Mor' },
      { note: 'F4', beats: 0.5, lyric: 'ba' },
      { note: 'A4', beats: 0.75, lyric: 'ni' },
      { note: 'A4', beats: 0.5, lyric: 'than' },
      { note: 'Bb4', beats: 0.5, lyric: 'ghat' },
      { note: 'A4', beats: 0.5, lyric: 'ka' },
      { note: 'G4', beats: 0.5, lyric: 're' },
      { note: 'F4', beats: 1.0, accent: true },
      // Man mor ba-ni than-ghat ka-re
      { note: 'E4', beats: 0.5, lyric: 'man' },
      { note: 'F4', beats: 0.5, lyric: 'mor' },
      { note: 'G4', beats: 0.5, lyric: 'ba' },
      { note: 'G4', beats: 0.5, lyric: 'ni' },
      { note: 'A4', beats: 0.5, lyric: 'than' },
      { note: 'G4', beats: 0.5, lyric: 'ghat' },
      { note: 'F4', beats: 0.5, lyric: 'ka' },
      { note: 'E4', beats: 0.5, lyric: 're' },
      { note: 'D4', beats: 1.5, accent: true },
      // Aabh ma jha-bu-ki re vij-li
      { note: 'A4', beats: 0.5, lyric: 'aabh' },
      { note: 'C5', beats: 0.5, lyric: 'ma' },
      { note: 'D5', beats: 0.75, lyric: 'jha' },
      { note: 'D5', beats: 0.5, lyric: 'bu' },
      { note: 'C5', beats: 0.5, lyric: 'ki' },
      { note: 'Bb4', beats: 0.5, lyric: 're' },
      { note: 'A4', beats: 1.5, lyric: 'vij-li', accent: true },
      { note: 'REST', beats: 0.5 }
    ]
  },
  {
    id: 'odhani',
    title: 'Odhani Odhu Odhu Ne',
    gujaratiTitle: 'ઓઢણી ઓઢું ઓઢું ને ઉડી જાય',
    artist: 'Falguni Pathak (Disco Dandiya)',
    tag: 'Classic Disco Dandiya Superhit • Non-Stop Groove',
    rhythmStyle: 'khelaiya',
    defaultBpm: 122,
    leadInstrument: 'harmonium',
    keyRoot: 'C4',
    vocalChants: ['Odhani Udi Jaye!', 'Mara Rasiya!', 'Dandiya Disco!'],
    lyrics: [
      { id: 1, gujarati: 'ઓઢણી ઓઢું ઓઢું ને ઉડી ઉડી જાય...', english: 'Odhani odhu odhu ne udi udi jaye...' },
      { id: 2, gujarati: 'મારા રસિયા જી રે, તારી યાદ સતાવે રે...', english: 'Mara rasiya ji re, tari yaad satave re...' },
      { id: 3, gujarati: 'ઢોલ ના તાલે રંગ રસિયો ઘૂમે રે...', english: 'Dhol na taale rang rasiyo ghoome re...' },
      { id: 4, gujarati: 'હાલો દાંડિયા રમવા, રંગભીની રાત રે!', english: 'Halo dandiya ramva, rangbhini raat re!' }
    ],
    melody: [
      // Odha-ni o-dhu o-dhu ne
      { note: 'G4', beats: 0.5, lyric: 'Odha' },
      { note: 'G4', beats: 0.5, lyric: 'ni' },
      { note: 'C5', beats: 0.75, lyric: 'o' },
      { note: 'C5', beats: 0.5, lyric: 'dhu' },
      { note: 'B4', beats: 0.5, lyric: 'o' },
      { note: 'A4', beats: 0.5, lyric: 'dhu' },
      { note: 'G4', beats: 1.0, lyric: 'ne', accent: true },
      // U-di u-di ja-ye
      { note: 'A4', beats: 0.5, lyric: 'u' },
      { note: 'B4', beats: 0.5, lyric: 'di' },
      { note: 'C5', beats: 0.75, lyric: 'u' },
      { note: 'A4', beats: 0.5, lyric: 'di' },
      { note: 'G4', beats: 1.5, lyric: 'ja-ye', accent: true },
      // Ma-ra ra-si-ya ji re
      { note: 'E4', beats: 0.5, lyric: 'ma' },
      { note: 'G4', beats: 0.5, lyric: 'ra' },
      { note: 'A4', beats: 0.5, lyric: 'ra' },
      { note: 'G4', beats: 0.5, lyric: 'si' },
      { note: 'E4', beats: 0.5, lyric: 'ya' },
      { note: 'D4', beats: 0.5, lyric: 'ji' },
      { note: 'C4', beats: 1.5, lyric: 're', accent: true },
      { note: 'REST', beats: 0.5 }
    ]
  }
];

class GarbaSongsAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private isMuted: boolean = false;
  private currentSongIndex: number = 0;
  private customBpm: number | null = null;
  private leadInstrumentOverride: 'harmonium' | 'bansuri' | 'shehnai' | null = null;
  private timerId: number | null = null;
  private noteIndex: number = 0;
  private stepInBeat: number = 0;
  private beatListeners: Array<(step: number, totalSteps: number, rhythm: string) => void> = [];
  private songChangeListeners: Array<(song: GarbaSong) => void> = [];
  private lyricsListeners: Array<(lineIndex: number, lyric: string, noteName: string) => void> = [];
  private currentLyricLineIndex: number = 0;

  // External audio streaming element (for live Gujarati Garba streams or custom audio tracks)
  private audioElement: HTMLAudioElement | null = null;
  private isLiveStreamMode: boolean = false;
  private liveStreamUrl: string = 'https://stream.zeno.fm/5f04v41dkm0uv'; // Goldy Gujarati Folk Live Stream

  constructor() {
    // Initialized on demand upon user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      // Dynamics Compressor to glue Dhol and Harmonium together like an arena PA
      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      compressor.knee.setValueAtTime(10, this.ctx.currentTime);
      compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain.connect(compressor);
      compressor.connect(this.ctx.destination);

      // Warm Tanpura Drone Gain
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.droneGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // ================= State Controls =================

  public getSongs(): GarbaSong[] {
    return GARBA_SONGS;
  }

  public getCurrentSong(): GarbaSong {
    return GARBA_SONGS[this.currentSongIndex];
  }

  public setSong(songIdOrIndex: string | number) {
    let index = 0;
    if (typeof songIdOrIndex === 'number') {
      index = Math.max(0, Math.min(GARBA_SONGS.length - 1, songIdOrIndex));
    } else {
      const found = GARBA_SONGS.findIndex((s) => s.id === songIdOrIndex);
      if (found !== -1) index = found;
    }

    this.currentSongIndex = index;
    this.noteIndex = 0;
    this.stepInBeat = 0;
    this.currentLyricLineIndex = 0;
    this.customBpm = null;

    const song = this.getCurrentSong();
    this.songChangeListeners.forEach((cb) => cb(song));
  }

  public nextSong(): GarbaSong {
    const nextIdx = (this.currentSongIndex + 1) % GARBA_SONGS.length;
    this.setSong(nextIdx);
    return this.getCurrentSong();
  }

  public prevSong(): GarbaSong {
    const prevIdx = (this.currentSongIndex - 1 + GARBA_SONGS.length) % GARBA_SONGS.length;
    this.setSong(prevIdx);
    return this.getCurrentSong();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setBpm(newBpm: number) {
    this.customBpm = Math.max(70, Math.min(160, newBpm));
  }

  public getBpm(): number {
    return this.customBpm || this.getCurrentSong().defaultBpm;
  }

  public setLeadInstrument(inst: 'harmonium' | 'bansuri' | 'shehnai' | 'auto') {
    this.leadInstrumentOverride = inst === 'auto' ? null : inst;
  }

  public getLeadInstrument(): 'harmonium' | 'bansuri' | 'shehnai' {
    return this.leadInstrumentOverride || this.getCurrentSong().leadInstrument;
  }

  public setRhythm(rhythm: '3-taali' | 'dodhiya' | 'sanedo' | 'dandiya-raas' | 'khelaiya') {
    // Allows switching groove style on the fly
    const song = this.getCurrentSong();
    song.rhythmStyle = rhythm;
  }

  public getRhythm() {
    return this.getCurrentSong().rhythmStyle;
  }

  // ================= Subscriptions =================

  public subscribeBeat(cb: (step: number, totalSteps: number, rhythm: string) => void) {
    this.beatListeners.push(cb);
    return () => {
      this.beatListeners = this.beatListeners.filter((l) => l !== cb);
    };
  }

  public subscribeSongChange(cb: (song: GarbaSong) => void) {
    this.songChangeListeners.push(cb);
    return () => {
      this.songChangeListeners = this.songChangeListeners.filter((l) => l !== cb);
    };
  }

  public subscribeLyrics(cb: (lineIndex: number, lyric: string, noteName: string) => void) {
    this.lyricsListeners.push(cb);
    return () => {
      this.lyricsListeners = this.lyricsListeners.filter((l) => l !== cb);
    };
  }

  // ================= Melodic Synthesizer =================

  /**
   * Authentic dual-reed Gujarati Harmonium tone
   * Combines fundamental and tremolo detuned reeds with resonant warm lowpass
   */
  public playHarmoniumNote(freq: number, durationSec: number, accent: boolean = false) {
    if (this.isMuted || freq === 0) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Sawtooth generates natural harmonium reeds
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, t);

    // Second reed detuned by +1.5 Hz creates the quintessential Indian harmonium vibrato
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq + 1.5, t);

    // Warm body filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(accent ? 2400 : 1800, t);
    filter.Q.setValueAtTime(2.2, t);

    // Envelope
    const peakVol = accent ? 0.38 : 0.28;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peakVol, t + 0.035);
    gain.gain.setValueAtTime(peakVol * 0.85, t + durationSec * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, t + durationSec);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + durationSec);
    osc2.stop(t + durationSec);
  }

  /**
   * Resonant Krishna Bansuri (Bamboo Flute) tone
   * Sine body + soft octave overtone + subtle pitch portamento and breath vibrato
   */
  public playBansuriNote(freq: number, durationSec: number, accent: boolean = false) {
    if (this.isMuted || freq === 0) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Gentle portamento glide
    osc.frequency.setValueAtTime(freq * 0.98, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.04);

    // Subtle 5.5 Hz vibrato LFO
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(5.5, t);
    lfoGain.gain.setValueAtTime(3.0, t);
    lfo.connect(osc.frequency);
    lfo.start(t);
    lfo.stop(t + durationSec);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 2, t);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.08, t);
    subOsc.connect(subGain);
    subGain.connect(gain);

    const peak = accent ? 0.42 : 0.32;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + durationSec);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    subOsc.start(t);
    osc.stop(t + durationSec);
    subOsc.stop(t + durationSec);
  }

  /**
   * Rustic Gujarati Shehnai (Aspirated Double Reed) tone
   */
  public playShehnaiNote(freq: number, durationSec: number, accent: boolean = false) {
    if (this.isMuted || freq === 0) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq * 0.96, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.03);

    // Shehnai nasal formant peak at 1400 Hz
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(accent ? 1600 : 1350, t);
    filter.Q.setValueAtTime(3.5, t);

    const peak = accent ? 0.45 : 0.34;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + durationSec);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + durationSec);
  }

  // ================= Authentic Percussion Section =================

  /**
   * Resonant low-frequency Gujarati Dhol bass drum strike ("Dhum / Ghud")
   */
  public playDholBass(accent: number = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(145, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + 0.12);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, t);
    filter.Q.setValueAtTime(4.0, t);

    const peak = Math.min(1.0, 0.85 * accent);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  /**
   * Crisp Dhol treble head / rim shot ("Ta / Khe")
   */
  public playDholTreble(accent: number = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, t);
    filter.Q.setValueAtTime(3.0, t);

    const gain = this.ctx.createGain();
    const peak = 0.42 * accent;
    gain.gain.setValueAtTime(peak, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.08);
  }

  /**
   * Solid wooden Dandiya stick strike ("Tak!")
   */
  public playDandiyaClack(accent: number = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1150, t);
    osc.frequency.exponentialRampToValueAtTime(540, t + 0.035);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.Q.setValueAtTime(5.5, t);

    const peak = Math.min(1.0, 0.75 * accent);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  /**
   * Garba hand clapping sound (Taali)
   */
  public playTaali() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.07);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.55, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.07);
  }

  /**
   * Ghungroo & Manjira metallic brass jingle
   */
  public playGhungroo() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(3200, t);
    osc.frequency.exponentialRampToValueAtTime(3800, t + 0.04);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  /**
   * Vocal Cheer / Shout ("Haalo!", "Hey!", "Sanedo!")
   */
  public playVocalChant(shoutText?: string) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const formant1 = this.ctx.createBiquadFilter();
    const formant2 = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Human vowel "Ah" / "Oh" formant synthesis
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, t);
    osc.frequency.exponentialRampToValueAtTime(310, t + 0.08);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.22);

    formant1.type = 'bandpass';
    formant1.frequency.setValueAtTime(800, t); // First formant
    formant1.Q.setValueAtTime(4.0, t);

    formant2.type = 'bandpass';
    formant2.frequency.setValueAtTime(1200, t); // Second formant
    formant2.Q.setValueAtTime(4.0, t);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(formant1);
    osc.connect(formant2);
    formant1.connect(gain);
    formant2.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.26);
  }

  // ================= Song Melodic Loop Sequencer =================

  public isRunning(): boolean {
    return this.timerId !== null || (this.audioElement !== null && !this.audioElement.paused);
  }

  public togglePlay(): boolean {
    if (this.isRunning()) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initContext();
    if (this.isRunning()) return;

    const currentSong = this.getCurrentSong();
    const bpm = this.getBpm();

    const tick = () => {
      this.executeSongStep();
      const bpmNow = this.getBpm();
      const intervalMs = (60 / bpmNow / 2) * 1000; // 8th-note tick resolution
      this.timerId = window.setTimeout(tick, intervalMs);
    };

    tick();
  }

  public stop() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.noteIndex = 0;
    this.stepInBeat = 0;
  }

  /**
   * Main step execution: syncs melodic note with underlying rhythmic dhol
   */
  private executeSongStep() {
    const song = this.getCurrentSong();
    const instrument = this.getLeadInstrument();
    const melody = song.melody;

    if (melody.length === 0) return;

    const currentMelodyNote = melody[this.noteIndex % melody.length];
    const freq = NOTE_FREQS[currentMelodyNote.note] || 0;
    const bpm = this.getBpm();
    const noteDurationSec = (currentMelodyNote.beats * (60 / bpm));

    // 1. Play Lead Melodic Note on step 0 of note duration
    if (this.stepInBeat === 0 && freq > 0) {
      if (instrument === 'harmonium') {
        this.playHarmoniumNote(freq, noteDurationSec * 0.9, currentMelodyNote.accent);
      } else if (instrument === 'bansuri') {
        this.playBansuriNote(freq, noteDurationSec * 0.95, currentMelodyNote.accent);
      } else {
        this.playShehnaiNote(freq, noteDurationSec * 0.88, currentMelodyNote.accent);
      }

      // Notify lyrics subscribers
      const lyricText = currentMelodyNote.lyric || '';
      if (song.lyrics.length > 0) {
        const approxLineIdx = Math.floor((this.noteIndex / melody.length) * song.lyrics.length) % song.lyrics.length;
        this.currentLyricLineIndex = approxLineIdx;
        this.lyricsListeners.forEach((cb) => {
          cb(this.currentLyricLineIndex, lyricText, currentMelodyNote.note);
        });
      }
    }

    // 2. Play Background Garba Dhol Percussion matching song rhythm style
    this.executeRhythmStepForSong(song.rhythmStyle);

    // 3. Advance step counters
    this.stepInBeat++;
    const noteSubSteps = Math.max(1, Math.round(currentMelodyNote.beats * 2)); // 8th note units

    if (this.stepInBeat >= noteSubSteps) {
      this.stepInBeat = 0;
      this.noteIndex = (this.noteIndex + 1) % melody.length;

      // Intermittent vocal cheer at phrase turnarounds
      if (this.noteIndex % 8 === 0 && Math.random() > 0.4) {
        this.playVocalChant();
      }
    }
  }

  /**
   * Executes authentic percussion rhythm in sync with the song
   */
  private executeRhythmStepForSong(r: '3-taali' | 'dodhiya' | 'sanedo' | 'dandiya-raas' | 'khelaiya') {
    const s = this.stepInBeat % 6;

    if (r === '3-taali') {
      const totalSteps = 6;
      const step = this.stepInBeat % totalSteps;
      switch (step) {
        case 0:
          this.playDholBass(1.1);
          this.playGhungroo();
          break;
        case 1:
          this.playDholTreble(0.6);
          break;
        case 2:
          this.playTaali();
          this.playDandiyaClack(0.9);
          break;
        case 3:
          this.playDholBass(0.75);
          break;
        case 4:
          this.playTaali();
          break;
        case 5:
          this.playTaali();
          this.playDandiyaClack(1.05);
          this.playGhungroo();
          break;
      }
      this.notifyBeat(step, totalSteps, r);
    } else if (r === 'dodhiya') {
      const totalSteps = 8;
      const step = this.stepInBeat % totalSteps;
      if (step === 0) {
        this.playDholBass(1.15);
        this.playGhungroo();
      } else if (step === 2) {
        this.playDandiyaClack(1.0);
        this.playDholTreble(0.7);
      } else if (step === 4) {
        this.playDholBass(0.9);
      } else if (step === 6) {
        this.playDandiyaClack(1.1);
        this.playTaali();
      } else if (step % 2 === 1) {
        this.playDholTreble(0.4);
      }
      this.notifyBeat(step, totalSteps, r);
    } else if (r === 'sanedo') {
      const totalSteps = 4;
      const step = this.stepInBeat % totalSteps;
      if (step === 0) {
        this.playDholBass(1.2);
        this.playGhungroo();
      } else if (step === 1) {
        this.playDholTreble(0.85);
      } else if (step === 2) {
        this.playDandiyaClack(1.05);
        this.playTaali();
      } else if (step === 3) {
        this.playDholTreble(0.65);
      }
      this.notifyBeat(step, totalSteps, r);
    } else if (r === 'dandiya-raas') {
      const totalSteps = 8;
      const step = this.stepInBeat % totalSteps;
      if (step === 0) {
        this.playDholBass(1.05);
        this.playDandiyaClack(1.0);
      } else if (step === 2) {
        this.playDandiyaClack(1.2);
      } else if (step === 4) {
        this.playDholBass(0.85);
        this.playDandiyaClack(0.95);
      } else if (step === 6) {
        this.playDandiyaClack(1.25);
        this.playGhungroo();
      } else {
        this.playDholTreble(0.45);
      }
      this.notifyBeat(step, totalSteps, r);
    } else if (r === 'khelaiya') {
      // Non-stop Disco Dandiya beat
      const totalSteps = 4;
      const step = this.stepInBeat % totalSteps;
      if (step === 0) {
        this.playDholBass(1.2);
        this.playDandiyaClack(1.0);
      } else if (step === 1) {
        this.playDholTreble(0.7);
      } else if (step === 2) {
        this.playDholBass(0.85);
        this.playTaali();
      } else if (step === 3) {
        this.playDandiyaClack(1.1);
        this.playGhungroo();
      }
      this.notifyBeat(step, totalSteps, r);
    }
  }

  private notifyBeat(step: number, total: number, rhythm: string) {
    this.beatListeners.forEach((fn) => {
      try {
        fn(step, total, rhythm);
      } catch (_) {
        // Safe listener execution
      }
    });
  }

  // ================= Live Gujarati Garba FM Stream =================

  public playLiveStream(streamUrl?: string) {
    this.stop();
    const url = streamUrl || this.liveStreamUrl;
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.crossOrigin = 'anonymous';
    }
    this.audioElement.src = url;
    this.audioElement.play().catch((err) => {
      console.warn('Audio streaming notice, switching to pure synthesizer engine:', err);
      this.start();
    });
    this.isLiveStreamMode = true;
  }

  public stopLiveStream() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.isLiveStreamMode = false;
  }

  public isStreaming(): boolean {
    return this.isLiveStreamMode;
  }
}

export const garbaAudio = new GarbaSongsAudioEngine();
