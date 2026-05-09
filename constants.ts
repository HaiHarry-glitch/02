import { Question } from './types';

// IMPORTANT: Preserving the keys and models as requested by user.
// In a real production app, these should be on a secure backend.
export const API_KEYS = [
    'AIzaSyCZ-s4v-WIsiY6mYrhR2s9jB0oxLGWhevY', 'AIzaSyD09e_JvAy9275XejrQyE3D-bYnLR1q-QI',
    'AIzaSyCcUOyfkfEGwaJOfbcD4MskV_Qh3ya34Og', 'AIzaSyDawXXwyoi8Omb4mGwMiPFjIg8URc434lE',
    'AIzaSyB4qKc9R9ukXueWWaHP1cpbozSDOxfU8eE', 'AIzaSyAeNu9FQ8nHWrvyHrcGwE0fll8MhevSk5o',
    'AIzaSyBSOUpvb9nbEtM1shIuPdFz24PUotm7dZg', 'AIzaSyBasFRU8FwuUlgvUZOkWuvGFEoy2vhk9X8',
    'AIzaSyDats8MLukrHEXoD7_9q3jYrMfGlQynycQ', 'AIzaSyDfX4bGu3fgmygbZTyJ6Lb7va4m1_xgbk8',
    'AIzaSyBhDnDn2BrdB9m9r2pHfvyif2U_0xGoWBk', 'AIzaSyC2LJHnKc3y2CBXVhNM-5zcCrv__Zat2A4',
    'AIzaSyCWb9yydazVl98ktHhHwvgOvxVoMkUrHmo', 'AIzaSyCmY7aNoMwg2gZTo9ZMdgX29bpCPd0DjNE',
    'AIzaSyAQBgBafbTmV5vx-x1WI83qk3aB6hgH4qg', 'AIzaSyCLek90qtSac-Kw8wKmS9csnkHJ7UZoQ6M',
    'AIzaSyBrdY3Qcm_tTgGJxGFaebyC7WQjbUVyUWk', 'AIzaSyAT1-Z8aO6-Xa6pF1KUa2X95DH5kRjprso',
    'AIzaSyA9NkZ5gH9ICFtU8uqOA991FmJ0aXecMYI', 'AIzaSyALzPxGRPC4wH_v66IPH2qHQhnMKXJc5xg',
    'AIzaSyCntBUvoG07y4uNB94tycDTJ5ufJo1CM_Y', 'AIzaSyCg3SGAx2UvFPOVpcS21y8r4VZFh0qUb-Q',
    'AIzaSyDKYdMSymfZCUPb_G9YJKKghVhgvCiWYXo', 'AIzaSyB-NRdsYPb1ApNUWIIZgq0Q8OhkFT6s01c',
    'AIzaSyC_8pIrGOXdC_Rt29E7XoTP5MSABilY6AI', 'AIzaSyCKOOY2OcPHN4PXmK4Fc0avobR2SzOCoDM',
    'AIzaSyDddm7L24GZao-TpSEJH1vtSRcOhfu-PBo', 'AIzaSyAZDA03Wmt2hknSXoiIWCl-sUKIVo33pgI',
    'AIzaSyApbKS-pyoCuyYJyu4O5qnvZ81k_B0mqA4', 'AIzaSyDgdynmxWgxALwz_f0Uffzz9UfI5cPI5CE',
    'AIzaSyCWapPn2MWfv36TPJEviBmI0hE-NUQJax8', 'AIzaSyB-BvMPmGKJltQIn4INFelyKTWIFfl-SLU',
    'AIzaSyBcTFhAAFQ-apD3B-8ues7VqGUEFtJeNNI', 'AIzaSyATOhEm_SOy8-whFE16btpIZhA_zK8j1J4',
    'AIzaSyA-PFL6zdwqeVEr6lK91gBQYpaeV2K3R7U', 'AIzaSyAnQaPRgBHvc_MaFIu5pFYb8obmpRCAWNY',
    'AIzaSyDrRSd6M2YjWBOAyglugRPFZltikBYli9k', 'AIzaSyA7qyVsBufteehbqGcRVx0lumiun-GLdY4',
    'AIzaSyDQHFAb_FeGa93hQ0N1XLturs2A4luKxgw', 'AIzaSyBH0QS05BQWYSFozQ3Q7wwcn6DL7iHbfWc',
    'AIzaSyDydg4WjuxPVDRb5iW9ZPvWI7zNayqdDmo', 'AIzaSyCIDH1nH-EBss5lc-EwcSWn4QRQmJypwLw',
    'AIzaSyC8iDZIqRi3F9TfAUbgr2aJCOLQDdhs3jo', 'AIzaSyA8ZeazLhNh3BN4OXMExxjgvwELVd7Fw6Q',
    'AIzaSyBtonuwpu3DoV9BjRBLyGpF9f5aZwHRIOQ', 'AIzaSyAQB--JXxShHj3JB9NqJKjbdq2pF1kg2Qg',
    'AIzaSyADiRtqbtDNM-_-XbNo8lr6hPvZ3Ga3AXg', 'AIzaSyBCNFwL9dUWYe7z066QXi3o9WpcKHiYJSE',
    'AIzaSyBCfaBQiHEY1oZ3GCBOu_EjidZGiNXJHys', 'AIzaSyBKqh99Pf0cyOlHBhXMqEPVQ8J57zwX8as',
    'AIzaSyAOdQDPo2Ng5PmavjBjnYeUE2VeTADrpjg', 'AIzaSyBQuIgYryREzml0PModL17Kt9--ydQXg84'
];

export const MODELS = [
    'gemini-3-flash-preview',
    'gemini-3.1-flash-lite-preview',
    'gemini-2.5-pro',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite'
];

export const SKIP_PASSWORD = 'hinjump2025';
// Updated URL as requested from the HTML reference
export const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwbtpdZzmrPJ-skjsy_bZ3KsqgYGEyJreRRNSgqQ58IbVJ8xayMzQB3MqaFfcJhimCsHw/exec';

export const LOCAL_STORAGE_KEY = 'hin_unit6_temperature_v2';
export const PASSING_SCORE = 90;

export const STAGE2_QUESTIONS: Question[] = [
    { type: 'mcq', part: "Phần 1: Từ vựng", question: "Từ nào đồng nghĩa với 'increase'?", options: ["drop", "fall", "rise", "affect"], answer: "C" },
    { type: 'mcq', part: "Phần 1: Từ vựng", question: "Từ nào đồng nghĩa với 'fall'?", options: ["drop", "rise", "measure", "record"], answer: "A" },
    { type: 'mcq', part: "Phần 1: Từ vựng", question: "Khi nhiệt độ thay đổi lên xuống liên tục, ta dùng từ nào?", options: ["remain stable", "fluctuate", "increase", "drop"], answer: "B" },
    { type: 'mcq', part: "Phần 1: Từ vựng", question: "Để diễn tả một sự sụt giảm nhẹ, ta dùng trạng từ nào?", options: ["sharply", "steadily", "slightly", "dramatically"], answer: "C" },
    { type: 'tf', part: "Phần 1: Từ vựng", question: "'Gradually' và 'steadily' có nghĩa là một sự thay đổi rất nhanh và đột ngột.", answer: "Sai" },
    { type: 'mcq', part: "Phần 2: Mô tả Biểu đồ", question: "Câu nào dùng để giới thiệu một biểu đồ?", options: ["Overall, the trend was upward.", "The graph shows how the temperature changed.", "It started at 10 units.", "In conclusion, the figures rose."], answer: "B" },
    { type: 'mcq', part: "Phần 2: Mô tả Biểu đồ", question: "Cấu trúc 'There was a slight fall in...' tương đương với câu nào?", options: ["The number fell slightly.", "The number fell sharply.", "There was a sharp fall.", "The number rose slightly."], answer: "A" },
    { type: 'tf', part: "Phần 2: Mô tả Biểu đồ", question: "Phần 'Overall Trend' nên mô tả chi tiết từng con số trong biểu đồ.", answer: "Sai" },
    { type: 'fill', part: "Phần 2: Mô tả Biểu đồ", question: "Hoàn thành câu: 'The price increased ________ from $5 to $50 in one day.'", answer: "sharply" },
    { type: 'mcq', part: "Phần 2: Mô tả Biểu đồ", question: "Để mô tả xu hướng chung, bạn nên tìm kiếm điều gì đầu tiên?", options: ["Điểm dữ liệu cuối cùng.", "Điểm dữ liệu đầu tiên.", "Sự thay đổi chính từ điểm đầu đến điểm cuối.", "Điểm cao nhất."], answer: "C" },
    { type: 'mcq', part: "Phần 3: So sánh", question: "Dạng so sánh hơn của 'hot' là gì?", options: ["hoter", "hotter", "more hot", "the hottest"], answer: "B" },
    { type: 'mcq', part: "Phần 3: So sánh", question: "Dạng so sánh nhất của 'polluted' là gì?", options: ["pollutedest", "the pollutedest", "more polluted", "the most polluted"], answer: "D" },
    { type: 'tf', part: "Phần 3: So sánh", question: "Câu 'Today is colder as yesterday' là đúng ngữ pháp.", answer: "Sai" },
    { type: 'mcq', part: "Phần 3: So sánh", question: "Để nhấn mạnh sự khác biệt lớn trong so sánh hơn, ta có thể dùng từ nào?", options: ["very", "so", "much", "as"], answer: "C" },
    { type: 'fill', part: "Phần 3: So sánh", question: "Hoàn thành câu: 'Mount Everest is __________ mountain in the world.'", answer: "the highest" },
];

export const STAGE3_QUESTIONS: Question[] = [
    { type: 'fill', part: "Bài 1: Điền từ (Vocabulary)", instruction: "Điền 1 từ trong khung để hoàn thành câu: (drop / rise / record / increase / affect / fall / measure / average)", question: "1. The temperature can __________ rapidly at night in the desert.", answer: "drop" },
    { type: 'fill', part: "Bài 1: Điền từ (Vocabulary)", instruction: "Điền 1 từ trong khung để hoàn thành câu: (drop / rise / record / increase / affect / fall / measure / average)", question: "2. Scientists often __________ temperature using a thermometer.", answer: "measure" },
    { type: 'fill', part: "Bài 1: Điền từ (Vocabulary)", instruction: "Điền 1 từ trong khung để hoàn thành câu: (drop / rise / record / increase / affect / fall / measure / average)", question: "3. The __________ temperature in July is around 35°C.", answer: "average" },
    { type: 'fill', part: "Bài 1: Điền từ (Vocabulary)", instruction: "Điền 1 từ trong khung để hoàn thành câu: (drop / rise / record / increase / affect / fall / measure / average)", question: "4. Global warming causes the Earth’s temperature to __________ every year.", answer: "rise" },
    { type: 'fill', part: "Bài 1: Điền từ (Vocabulary)", instruction: "Điền 1 từ trong khung để hoàn thành câu: (drop / rise / record / increase / affect / fall / measure / average)", question: "5. When body temperature __________ below 35°C, it can be dangerous.", answer: "falls" },
    { type: 'fill', part: "Bài 1: Điền từ (Vocabulary)", instruction: "Điền 1 từ trong khung để hoàn thành câu: (drop / rise / record / increase / affect / fall / measure / average)", question: "6. The doctor said the patient’s temperature had __________ after taking the medicine.", answer: "dropped" },
    { type: 'fill', part: "Bài 1: Điền từ (Vocabulary)", instruction: "Điền 1 từ trong khung để hoàn thành câu: (drop / rise / record / increase / affect / fall / measure / average)", question: "7. Climate change can __________ both air and water temperature.", answer: "affect" },
    { type: 'fill', part: "Bài 1: Điền từ (Vocabulary)", instruction: "Điền 1 từ trong khung để hoàn thành câu: (drop / rise / record / increase / affect / fall / measure / average)", question: "8. The hottest temperature ever __________ in Vietnam was over 43°C.", answer: "recorded" },
    { type: 'mcq', part: "Bài 2: Miêu tả biểu đồ (Graph)", instruction: "Đọc đoạn văn và chọn từ đúng cho mỗi chỗ trống (1-5). Đoạn văn: The graph shows how the average global temperature changed between 1990 and 2020.", question: "1. Overall, the temperature __________ slightly over the period.", options: ["rose", "fell", "remained stable"], answer: "A" },
    { type: 'mcq', part: "Bài 2: Miêu tả biểu đồ (Graph)", instruction: "Đọc đoạn văn và chọn từ đúng cho mỗi chỗ trống (1-5).", question: "2. In 1990, it started at about 14°C and __________ gradually until 2000.", options: ["increased", "dropped", "fluctuated"], answer: "A" },
    { type: 'mcq', part: "Bài 2: Miêu tả biểu đồ (Graph)", instruction: "Đọc đoạn văn và chọn từ đúng cho mỗi chỗ trống (1-5).", question: "3. From 2000 to 2010, there was a __________ rise, reaching around 14.8°C.", options: ["sharp", "steady", "sudden"], answer: "B" },
    { type: 'mcq', part: "Bài 2: Miêu tả biểu đồ (Graph)", instruction: "Đọc đoạn văn và chọn từ đúng cho mỗi chỗ trống (1-5).", question: "4. After 2010, the figure __________ slightly but remained above 14.5°C.", options: ["stayed the same", "fluctuated", "decreased"], answer: "B" },
    { type: 'mcq', part: "Bài 2: Miêu tả biểu đồ (Graph)", instruction: "Đọc đoạn văn và chọn từ đúng cho mỗi chỗ trống (1-5).", question: "5. In conclusion, global temperature __________.", options: ["showed a downward trend", "experienced a gradual increase", "remained unchanged"], answer: "B" },
    { type: 'mcq', part: "Bài 3: So sánh (Comparatives)", instruction: "Chọn đáp án đúng nhất.", question: "1. Today is __________ than yesterday.", options: ["hot", "hotter", "the hottest"], answer: "B" },
    { type: 'mcq', part: "Bài 3: So sánh (Comparatives)", instruction: "Chọn đáp án đúng nhất.", question: "2. January is usually __________ month of the year.", options: ["cold", "colder", "the coldest"], answer: "C" },
    { type: 'mcq', part: "Bài 3: So sánh (Comparatives)", instruction: "Chọn đáp án đúng nhất.", question: "3. This city is __________ polluted than it was five years ago.", options: ["much", "more", "most"], answer: "B" },
    { type: 'mcq', part: "Bài 3: So sánh (Comparatives)", instruction: "Chọn đáp án đúng nhất.", question: "4. Vietnam is one of __________ beautiful countries in Southeast Asia.", options: ["more", "the most", "the more"], answer: "B" },
    { type: 'mcq', part: "Bài 3: So sánh (Comparatives)", instruction: "Chọn đáp án đúng nhất.", question: "5. This year’s temperature is __________ high as last year’s.", options: ["nearly", "as", "not as"], answer: "C" },
    { type: 'fill', part: "Bài 4: Viết lại câu (Sentence Transformation)", instruction: "Viết lại câu dùng dạng so sánh đúng.", question: "1. Hanoi is hot. Ho Chi Minh City is hotter. → Ho Chi Minh City is __________ Hanoi.", answer: "hotter than" },
    { type: 'fill', part: "Bài 4: Viết lại câu (Sentence Transformation)", instruction: "Viết lại câu dùng dạng so sánh đúng.", question: "2. February is a cold month. January is colder. → January is __________ month of the year.", answer: "the coldest" },
    { type: 'fill', part: "Bài 4: Viết lại câu (Sentence Transformation)", instruction: "Viết lại câu dùng dạng so sánh đúng.", question: "3. Today is warm. Yesterday was not so warm. → Today is __________ than yesterday.", answer: "warmer" },
    { type: 'fill', part: "Bài 4: Viết lại câu (Sentence Transformation)", instruction: "Viết lại câu dùng dạng so sánh đúng.", question: "4. Mount Everest is very high. → Mount Everest is __________ mountain in the world.", answer: "the highest" },
    { type: 'fill', part: "Bài 5: Dịch thuật & Viết (Translation & Writing)", instruction: "Dịch các câu sau sang tiếng Anh.", question: "1. Nhiệt độ tăng nhẹ vào đầu mùa xuân.", answer: "The temperature rose slightly in early spring." },
    { type: 'fill', part: "Bài 5: Dịch thuật & Viết (Translation & Writing)", instruction: "Dịch các câu sau sang tiếng Anh.", question: "2. Nhiệt độ giảm mạnh vào ban đêm.", answer: "The temperature dropped sharply at night." },
    { type: 'fill', part: "Bài 5: Dịch thuật & Viết (Translation & Writing)", instruction: "Dịch các câu sau sang tiếng Anh.", question: "3. Nhiệt độ giảm dần từ tháng Chín đến tháng Mười hai.", answer: "The temperature fell gradually from September to December." },
    { type: 'fill', part: "Bài 5: Dịch thuật & Viết (Translation & Writing)", instruction: "Dịch các câu sau sang tiếng Anh.", question: "4. Nhiệt độ duy trì ổn định trong suốt mùa hè.", answer: "The temperature remained stable throughout the summer." },
    { type: 'fill', part: "Bài 5: Dịch thuật & Viết (Translation & Writing)", instruction: "Dịch các câu sau sang tiếng Anh.", question: "5. Lượng mưa tăng nhẹ vào cuối mùa thu.", answer: "Rainfall increased slightly at the end of autumn." },
    { type: 'fill', part: "Bài 5: Dịch thuật & Viết (Translation & Writing)", instruction: "Dịch các câu sau sang tiếng Anh.", question: "6. Mùa đông lạnh hơn nhiều so với mùa thu.", answer: "Winter is much colder than autumn." },
    { type: 'fill', part: "Bài 5: Dịch thuật & Viết (Translation & Writing)", instruction: "Dịch các câu sau sang tiếng Anh.", question: "7. Mùa hè là mùa nóng nhất trong năm.", answer: "Summer is the hottest season of the year." },
    { type: 'fill', part: "Bài 5: Dịch thuật & Viết (Translation & Writing)", instruction: "Dịch các câu sau sang tiếng Anh.", question: "8. Sau tháng Bảy, nhiệt độ bắt đầu giảm mạnh.", answer: "After July, the temperature began to fall sharply." },
    {
        type: 'fill',
        part: "Bài 6: Viết mô tả Biểu đồ (Graph Writing)",
        instruction: "Viết 3 câu mô tả ngắn dựa vào biểu đồ. Ví dụ: <i>The temperature rose gradually from January to July.</i>",
        question: "Câu mô tả 1:",
        imageUrl: "https://psqsvkjrfhbnookqedmg.supabase.co/storage/v1/object/public/aaaaaaaaaaaaaaaa/2411.png",
        answer: "Mô tả một xu hướng hợp lệ từ biểu đồ (ví dụ: giảm, ổn định, điểm cao nhất)."
    },
    {
        type: 'fill',
        part: "Bài 6: Viết mô tả Biểu đồ (Graph Writing)",
        instruction: "Viết 3 câu mô tả ngắn dựa vào biểu đồ. Ví dụ: <i>The temperature rose gradually from January to July.</i>",
        question: "Câu mô tả 2:",
        imageUrl: "https://psqsvkjrfhbnookqedmg.supabase.co/storage/v1/object/public/aaaaaaaaaaaaaaaa/2411.png",
        answer: "Mô tả một xu hướng hợp lệ khác từ biểu đồ."
    },
    {
        type: 'fill',
        part: "Bài 6: Viết mô tả Biểu đồ (Graph Writing)",
        instruction: "Viết 3 câu mô tả ngắn dựa vào biểu đồ. Ví dụ: <i>The temperature rose gradually from January to July.</i>",
        question: "Câu mô tả 3:",
        imageUrl: "https://psqsvkjrfhbnookqedmg.supabase.co/storage/v1/object/public/aaaaaaaaaaaaaaaa/2411.png",
        answer: "Mô tả một xu hướng hợp lệ khác từ biểu đồ."
    }
];