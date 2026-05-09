
import { Lesson, Question } from '../types';
import { STAGE2_QUESTIONS, STAGE3_QUESTIONS } from '../constants';

// --- FOUNDATION 01 CONTENT (EXISTING) ---

const UNIT6_LESSON1_THEORY = `
<div class="space-y-8">
  <!-- Vocabulary Section -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-book-reader text-hin-gold"></i> 1. Từ vựng về Nhiệt độ & Biểu đồ
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-blue-50 p-5 rounded-xl border border-blue-100">
        <h4 class="font-bold text-blue-800 mb-2">Nhiệt độ (Temperature)</h4>
        <ul class="space-y-2 text-gray-700">
           <li>🔥 <strong>Hot / Warm:</strong> Nóng / Ấm</li>
           <li>❄️ <strong>Cold / Cool:</strong> Lạnh / Mát</li>
           <li>🌡️ <strong>To freeze:</strong> Đóng băng</li>
           <li>📉 <strong>Degree (°C):</strong> Độ</li>
        </ul>
      </div>
      <div class="bg-green-50 p-5 rounded-xl border border-green-100">
        <h4 class="font-bold text-green-800 mb-2">Xu hướng (Trends)</h4>
        <ul class="space-y-2 text-gray-700">
           <li>↗️ <strong>Increase / Rise / Go up:</strong> Tăng</li>
           <li>↘️ <strong>Decrease / Fall / Drop:</strong> Giảm</li>
           <li>➡️ <strong>Remain stable:</strong> Ổn định</li>
           <li>〰️ <strong>Fluctuate:</strong> Dao động</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Adverbs Section -->
  <div>
     <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-tachometer-alt text-hin-gold"></i> 2. Trạng từ chỉ mức độ
    </h3>
    <div class="bg-gray-50 p-5 rounded-xl border border-gray-200">
       <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
             <span class="font-bold text-red-500">Mạnh / Nhanh:</span>
             <p class="text-gray-600 italic">Sharply, Suddenly, Dramatically, Rapidly</p>
             <p class="text-xs text-gray-400 mt-1">Ex: The price rose sharply.</p>
          </div>
          <div>
             <span class="font-bold text-blue-500">Nhẹ / Từ từ:</span>
             <p class="text-gray-600 italic">Slightly, Gradually, Steadily, Slowly</p>
             <p class="text-xs text-gray-400 mt-1">Ex: The temperature fell slightly.</p>
          </div>
       </div>
    </div>
  </div>

  <!-- Grammar Section -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-layer-group text-hin-gold"></i> 3. Cấu trúc So sánh (Comparisons)
    </h3>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
        <thead class="bg-hin-blue text-white">
            <tr>
                <th class="p-3">Loại từ</th>
                <th class="p-3">So sánh hơn (Comparatives)</th>
                <th class="p-3">So sánh nhất (Superlatives)</th>
            </tr>
        </thead>
        <tbody class="text-gray-700">
            <tr class="border-b border-gray-100">
                <td class="p-3 font-medium">Ngắn (Short)<br/><span class="text-xs text-gray-400 font-normal">hot, cold, high</span></td>
                <td class="p-3">adj + <strong>er</strong> + than<br/><span class="text-xs text-blue-600">hotter than</span></td>
                <td class="p-3">the + adj + <strong>est</strong><br/><span class="text-xs text-blue-600">the hottest</span></td>
            </tr>
            <tr class="border-b border-gray-100 bg-gray-50">
                <td class="p-3 font-medium">Dài (Long)<br/><span class="text-xs text-gray-400 font-normal">polluted, beautiful</span></td>
                <td class="p-3"><strong>more</strong> + adj + than<br/><span class="text-xs text-blue-600">more polluted than</span></td>
                <td class="p-3"><strong>the most</strong> + adj<br/><span class="text-xs text-blue-600">the most polluted</span></td>
            </tr>
            <tr>
                <td class="p-3 font-medium">Đặc biệt<br/><span class="text-xs text-gray-400 font-normal">good, bad</span></td>
                <td class="p-3">better, worse</td>
                <td class="p-3">the best, the worst</td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;

const UNIT7_THEORY = `
<div class="space-y-8">
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-list-ol text-hin-gold"></i> 1. Ordering Events (Trình tự sự kiện)
    </h3>
    <div class="bg-blue-50 p-5 rounded-xl border border-blue-100">
      <p class="mb-2">Sử dụng các từ nối (linkers) để miêu tả một quy trình:</p>
      <ul class="space-y-2 text-gray-700 font-medium">
         <li>1️⃣ <strong>First:</strong> Đầu tiên</li>
         <li>2️⃣ <strong>Then / Next:</strong> Sau đó / Tiếp theo</li>
         <li>3️⃣ <strong>After that:</strong> Sau đó nữa</li>
         <li>4️⃣ <strong>Finally:</strong> Cuối cùng</li>
      </ul>
    </div>
  </div>

  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-users-cog text-hin-gold"></i> 2. Subject-Verb Agreement (Hòa hợp chủ ngữ - động từ)
    </h3>
    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
            <h4 class="font-bold text-hin-blue mb-2">Quy tắc cơ bản</h4>
            <ul class="text-sm space-y-2">
                <li>• <strong>Singular Subject</strong> (He, She, It, The team) ➝ <strong>Verb + s/es</strong> (e.g., plays, runs)</li>
                <li>• <strong>Plural Subject</strong> (We, They, The players) ➝ <strong>Verb (base)</strong> (e.g., play, run)</li>
            </ul>
         </div>
         <div>
            <h4 class="font-bold text-hin-blue mb-2">Trường hợp đặc biệt</h4>
             <ul class="text-sm space-y-2">
                <li>• <strong>Each / Every</strong> + Noun ➝ Singular Verb (is/has)</li>
                <li>• <strong>Neither / Either</strong> ➝ Singular Verb (thường dùng)</li>
                <li>• <strong>A number of</strong> ➝ Plural Verb (are)</li>
            </ul>
         </div>
      </div>
    </div>
  </div>

  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-running text-hin-gold"></i> 3. Prepositions of Movement (Giới từ chỉ chuyển động)
    </h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
       <div class="bg-gray-50 p-3 rounded border"><strong>Across:</strong> Băng qua (mặt phẳng)</div>
       <div class="bg-gray-50 p-3 rounded border"><strong>Through:</strong> Xuyên qua (không gian)</div>
       <div class="bg-gray-50 p-3 rounded border"><strong>Over:</strong> Nhảy qua/Vượt qua</div>
       <div class="bg-gray-50 p-3 rounded border"><strong>Along:</strong> Dọc theo</div>
       <div class="bg-gray-50 p-3 rounded border"><strong>Into:</strong> Đi vào trong</div>
       <div class="bg-gray-50 p-3 rounded border"><strong>Past:</strong> Đi ngang qua</div>
       <div class="bg-gray-50 p-3 rounded border"><strong>Around:</strong> Đi vòng quanh</div>
    </div>
  </div>
</div>
`;

const UNIT8_THEORY = `
<div class="space-y-8">
  <!-- Multi-word Verbs -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-random text-hin-gold"></i> 1. Multi-word Verbs (Cụm động từ)
    </h3>
    <div class="bg-blue-50 p-5 rounded-xl border border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-4">
       <div>
         <ul class="space-y-3 text-gray-700">
           <li>🔍 <strong>Find out:</strong> Tìm ra, khám phá thông tin.</li>
           <li>📝 <strong>Note down:</strong> Ghi chép lại để nhớ.</li>
           <li>🤝 <strong>Get on with:</strong> Hòa thuận với ai đó.</li>
         </ul>
       </div>
       <div>
         <ul class="space-y-3 text-gray-700">
           <li>⏳ <strong>Carry on with:</strong> Tiếp tục làm gì đó.</li>
           <li>🚫 <strong>Run out of:</strong> Hết, cạn kiệt (tiền, sữa...).</li>
           <li>👌 <strong>Get by:</strong> Xoay xở để sống/làm việc.</li>
         </ul>
       </div>
    </div>
  </div>

  <!-- Comparatives Review -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-arrows-alt-h text-hin-gold"></i> 2. So sánh hơn & So sánh nhất
    </h3>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left border-collapse">
            <thead class="bg-gray-100 text-gray-700">
                <tr>
                    <th class="p-3 border-b">Loại từ</th>
                    <th class="p-3 border-b">So sánh hơn (Comparatives)</th>
                    <th class="p-3 border-b">So sánh nhất (Superlatives)</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="p-3">Ngắn (Big, Fast)</td>
                    <td class="p-3 text-blue-600">Bigger, Faster</td>
                    <td class="p-3 text-green-600">The biggest, The fastest</td>
                </tr>
                <tr class="border-b">
                    <td class="p-3">Dài (Successful)</td>
                    <td class="p-3 text-blue-600">More successful</td>
                    <td class="p-3 text-green-600">The most successful</td>
                </tr>
                <tr>
                    <td class="p-3">Bất quy tắc (Good, Bad)</td>
                    <td class="p-3 text-blue-600">Better, Worse</td>
                    <td class="p-3 text-green-600">The best, The worst</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>

  <!-- Writing Context -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-pen-fancy text-hin-gold"></i> 3. Kỹ năng Viết (Pre-writing)
    </h3>
    <div class="bg-green-50 p-4 rounded-xl border border-green-100 text-sm">
        <p class="mb-2"><strong>Kết hợp câu (Combining sentences):</strong> Sử dụng <em>"when"</em> để nối hai sự kiện trong quá khứ.</p>
        <p class="italic text-gray-600">Ex: He started business. He was 25. → He started business <strong>when</strong> he was 25.</p>
        <p class="mt-4 mb-2"><strong>Thêm chi tiết (Adding details):</strong> Thêm thời gian, địa điểm hoặc lý do để câu văn hay hơn.</p>
        <p class="italic text-gray-600">Ex: Google started. → Google started <strong>in 1998 in a garage</strong>.</p>
    </div>
  </div>
</div>
`;

const UNIT9_THEORY = `
<div class="space-y-8">
  <!-- Pronouns & Possessives -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-user-friends text-hin-gold"></i> 1. Subject, Object & Possessive Pronouns
    </h3>
    <div class="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
       <table class="w-full text-left text-sm md:text-base">
         <thead class="bg-blue-50 text-blue-800">
           <tr>
             <th class="p-3">Subject (Chủ ngữ)</th>
             <th class="p-3">Object (Tân ngữ)</th>
             <th class="p-3">Possessive Adj (Tính từ sở hữu)</th>
           </tr>
         </thead>
         <tbody class="divide-y divide-gray-100">
           <tr><td class="p-3">I</td><td class="p-3">Me</td><td class="p-3">My (book)</td></tr>
           <tr><td class="p-3">You</td><td class="p-3">You</td><td class="p-3">Your</td></tr>
           <tr><td class="p-3">He</td><td class="p-3">Him</td><td class="p-3">His</td></tr>
           <tr><td class="p-3">She</td><td class="p-3">Her</td><td class="p-3">Her</td></tr>
           <tr><td class="p-3">It</td><td class="p-3">It</td><td class="p-3">Its</td></tr>
           <tr><td class="p-3">We</td><td class="p-3">Us</td><td class="p-3">Our</td></tr>
           <tr><td class="p-3">They</td><td class="p-3">Them</td><td class="p-3">Their</td></tr>
         </tbody>
       </table>
    </div>
  </div>

  <!-- -ED vs -ING -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-smile-beam text-hin-gold"></i> 2. Adjectives ending in -ED vs -ING
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <strong class="text-yellow-800 block mb-2">-ED Adjectives</strong>
          <p class="text-gray-700 text-sm mb-2">Miêu tả <strong>cảm xúc</strong> của con người.</p>
          <p class="italic text-gray-600 text-xs">Ex: I am <strong>bored</strong> because the movie is slow.</p>
       </div>
       <div class="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <strong class="text-purple-800 block mb-2">-ING Adjectives</strong>
          <p class="text-gray-700 text-sm mb-2">Miêu tả <strong>tính chất</strong> của sự vật/sự việc.</p>
          <p class="italic text-gray-600 text-xs">Ex: The movie is <strong>boring</strong>.</p>
       </div>
    </div>
  </div>

  <!-- Describing Objects -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-tools text-hin-gold"></i> 3. Describing Objects
    </h3>
    <div class="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
        <p>⚙️ <strong>is used for + V-ing:</strong> Được dùng để làm gì. <br/><span class="text-gray-500 text-sm">Ex: A ruler is used for measuring.</span></p>
        <p>🧱 <strong>is made of + noun:</strong> Được làm bằng chất liệu gì. <br/><span class="text-gray-500 text-sm">Ex: The bag is made of leather.</span></p>
        <p>✨ <strong>lets you + V(base):</strong> Cho phép bạn làm gì. <br/><span class="text-gray-500 text-sm">Ex: This machine lets you make coffee.</span></p>
        <p>🧩 <strong>has ... parts:</strong> Có bao nhiêu phần. <br/><span class="text-gray-500 text-sm">Ex: It has three main parts.</span></p>
    </div>
  </div>
  
  <!-- Describing People -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-user-tag text-hin-gold"></i> 4. Describing People
    </h3>
    <div class="flex flex-wrap gap-2">
        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">Kind (Tốt bụng)</span>
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">Intelligent (Thông minh)</span>
        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">Calm (Bình tĩnh)</span>
        <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">Honest (Trung thực)</span>
        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-bold">Patient (Kiên nhẫn)</span>
    </div>
  </div>
</div>
`;

const UNIT10_THEORY = `
<div class="space-y-8">
  <!-- Conditionals -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-random text-hin-gold"></i> 1. Conditionals (Câu điều kiện)
    </h3>
    <div class="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 mb-4">
      <table class="w-full text-left">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
             <th class="p-3">Loại (Type)</th>
             <th class="p-3">Cấu trúc (Structure)</th>
             <th class="p-3">Cách dùng (Usage)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr>
            <td class="p-3 font-bold text-blue-600">Type 1<br><span class="text-xs font-normal text-gray-500">Real/Possible</span></td>
            <td class="p-3">If + Present Simple,<br>... will / can + V</td>
            <td class="p-3">Điều có thể xảy ra trong tương lai.<br><span class="italic text-sm text-gray-500">Ex: If we find water, we will study it.</span></td>
          </tr>
          <tr>
            <td class="p-3 font-bold text-purple-600">Type 2<br><span class="text-xs font-normal text-gray-500">Unreal</span></td>
            <td class="p-3">If + Past Simple,<br>... would / could + V</td>
            <td class="p-3">Điều không có thật hoặc giả định.<br><span class="italic text-sm text-gray-500">Ex: If aliens landed, people would be shocked.</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Infinitive of Purpose -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-bullseye text-hin-gold"></i> 2. Infinitive of Purpose
    </h3>
    <div class="bg-yellow-50 p-5 rounded-xl border border-yellow-100">
       <p class="text-lg mb-2">Structure: <strong>to + V (infinitive)</strong></p>
       <p class="text-gray-700 mb-2">Dùng để giải thích <strong>mục đích</strong> (lý do) làm việc gì.</p>
       <ul class="list-disc pl-5 space-y-1 text-gray-600 italic">
          <li>NASA sent robots <strong>to explore</strong> Mars.</li>
          <li>Astronauts exercise <strong>to stay</strong> healthy.</li>
       </ul>
    </div>
  </div>

  <!-- Developing Sentence Structure -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-pen-nib text-hin-gold"></i> 3. Developing Sentence Structure
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
       <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <strong class="text-hin-blue block mb-2">Introductory Phrases (Mở đầu câu)</strong>
          <ul class="space-y-2 text-sm">
             <li>• <strong>Some people think that...</strong> (Một số người nghĩ rằng...)</li>
             <li>• <strong>Scientists believe that...</strong> (Các nhà khoa học tin rằng...)</li>
             <li>• <strong>Studies show that...</strong> (Các nghiên cứu cho thấy...)</li>
          </ul>
       </div>
       <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <strong class="text-blue-800 block mb-2">Writing Structures (Cấu trúc viết)</strong>
          <ul class="space-y-2 text-sm">
             <li>• <strong>Should + V:</strong> Nên làm gì. <br><span class="text-xs text-gray-500">We should spend more money.</span></li>
             <li>• <strong>It is important to + V:</strong> Quan trọng để làm gì. <br><span class="text-xs text-gray-500">It is important to protect Earth.</span></li>
          </ul>
       </div>
    </div>
  </div>
</div>
`;

// --- FOUNDATION 02 CONTENT (NEW) ---

const F2_UNIT8_THEORY = `
<div class="space-y-8">
  <!-- Topic Intro -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-heartbeat text-hin-gold"></i> 1. Health & Sports Vocabulary
    </h3>
    <div class="bg-blue-50 p-5 rounded-xl border border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-4">
       <div>
         <h4 class="font-bold text-blue-800 mb-2">Sport Collocations</h4>
         <ul class="space-y-2 text-gray-700">
           <li>🎾 <strong>Play:</strong> tennis, basketball, football, computer games</li>
           <li>🧘 <strong>Do:</strong> yoga, exercise</li>
           <li>🚴 <strong>Go:</strong> cycling, for a walk</li>
         </ul>
       </div>
       <div>
         <h4 class="font-bold text-blue-800 mb-2">Healthy Actions</h4>
         <ul class="space-y-2 text-gray-700">
           <li>🥤 <strong>Drink:</strong> plenty of water</li>
           <li>🥗 <strong>Eat:</strong> fruit and vegetables</li>
           <li>💪 <strong>Join:</strong> a gym</li>
         </ul>
       </div>
    </div>
  </div>

  <!-- Advice: Should -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-comment-medical text-hin-gold"></i> 2. Advice: Should / Shouldn't
    </h3>
    <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <p class="mb-4">Dùng để đưa ra lời khuyên hoặc ý kiến về điều gì đó là tốt hay không tốt.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div class="bg-green-50 p-4 rounded-lg">
             <strong class="text-green-700">Should (Nên)</strong>
             <p class="text-sm mt-1">You <strong>should eat</strong> more fruit.</p>
             <p class="text-sm">I think you <strong>should go</strong> to bed early.</p>
         </div>
         <div class="bg-red-50 p-4 rounded-lg">
             <strong class="text-red-700">Shouldn't (Không nên)</strong>
             <p class="text-sm mt-1">You <strong>shouldn't drink</strong> too much coffee.</p>
             <p class="text-sm">I think you <strong>should not play</strong> games all night.</p>
         </div>
      </div>
    </div>
  </div>

  <!-- Obligation: Have to -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-exclamation-circle text-hin-gold"></i> 3. Obligation: Have to / Don't have to
    </h3>
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse bg-white rounded-xl border border-gray-200">
            <thead class="bg-gray-100 text-gray-700">
                <tr>
                    <th class="p-3 border-b">Subject</th>
                    <th class="p-3 border-b">Positive (+)</th>
                    <th class="p-3 border-b">Negative (-)</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="p-3 font-bold">I / You / We / They</td>
                    <td class="p-3"><strong>have to</strong> work<br><span class="text-xs text-gray-500">(Bắt buộc phải làm)</span></td>
                    <td class="p-3"><strong>don't have to</strong> work<br><span class="text-xs text-gray-500">(Không cần thiết phải làm)</span></td>
                </tr>
                <tr>
                    <td class="p-3 font-bold">He / She / It</td>
                    <td class="p-3"><strong>has to</strong> work</td>
                    <td class="p-3"><strong>doesn't have to</strong> work</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
        <p><strong>Lưu ý:</strong> "Don't have to" không có nghĩa là cấm, mà là "không cần thiết" (bạn có thể làm nếu muốn).</p>
        <p class="italic text-gray-600">Ex: You don't have to pay (it's free).</p>
    </div>
  </div>
</div>
`;

const F2_UNIT9_THEORY = `
<div class="space-y-8">
  <!-- Topic Intro -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-calendar-alt text-hin-gold"></i> 1. Future Plans (Going to)
    </h3>
    <div class="bg-blue-50 p-5 rounded-xl border border-blue-100">
      <p class="mb-4">Use <strong>be going to + V</strong> to talk about future plans and intentions.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
            <strong class="text-blue-800">Positive (+)</strong>
            <ul class="text-sm mt-1 text-gray-700">
               <li>I <strong>am going to</strong> buy a dictionary.</li>
               <li>She <strong>is going to</strong> study hard.</li>
               <li>We <strong>are going to</strong> visit London.</li>
            </ul>
         </div>
         <div>
            <strong class="text-red-800">Negative (-) & Question (?)</strong>
            <ul class="text-sm mt-1 text-gray-700">
               <li>I <strong>am not going to</strong> worry.</li>
               <li><strong>Are</strong> you <strong>going to</strong> learn French?</li>
            </ul>
         </div>
      </div>
    </div>
  </div>

  <!-- Collocations -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-handshake text-hin-gold"></i> 2. Collocations: Make & Take
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div class="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
          <h4 class="font-bold text-yellow-800 mb-2">MAKE (Tạo ra/Làm ra)</h4>
          <ul class="space-y-2 text-gray-700">
             <li>❌ <strong>Make a mistake:</strong> Phạm lỗi</li>
             <li>🔊 <strong>Make a noise:</strong> Làm ồn</li>
             <li>🤣 <strong>Make someone laugh:</strong> Làm ai đó cười</li>
             <li>🤔 <strong>Make a guess:</strong> Phỏng đoán</li>
          </ul>
       </div>
       <div class="bg-green-50 p-5 rounded-xl border border-green-200">
          <h4 class="font-bold text-green-800 mb-2">TAKE (Thực hiện/Lấy)</h4>
          <ul class="space-y-2 text-gray-700">
             <li>📝 <strong>Take an exam / a test:</strong> Làm bài kiểm tra</li>
             <li>📸 <strong>Take a picture/photo:</strong> Chụp ảnh</li>
             <li>🚶 <strong>Take a walk:</strong> Đi dạo</li>
          </ul>
       </div>
    </div>
  </div>

  <!-- Linking Words -->
  <div>
    <h3 class="flex items-center gap-2 text-xl font-bold text-hin-blue mb-4 border-b border-gray-200 pb-2">
      <i class="fas fa-link text-hin-gold"></i> 3. Linking Words (Từ nối)
    </h3>
    <div class="overflow-x-auto">
        <table class="w-full text-left bg-white rounded-xl border border-gray-200 shadow-sm">
           <thead class="bg-gray-100">
              <tr>
                 <th class="p-3">Chức năng</th>
                 <th class="p-3">Từ vựng (Vocabulary)</th>
              </tr>
           </thead>
           <tbody class="divide-y divide-gray-100">
              <tr>
                 <td class="p-3 font-bold text-gray-600">Bắt đầu/Thứ tự</td>
                 <td class="p-3"><strong>Firstly</strong> (Đầu tiên)</td>
              </tr>
              <tr>
                 <td class="p-3 font-bold text-gray-600">Thêm thông tin</td>
                 <td class="p-3"><strong>Furthermore, Additionally, Also</strong> (Hơn nữa, ngoài ra)</td>
              </tr>
              <tr>
                 <td class="p-3 font-bold text-gray-600">Tương phản</td>
                 <td class="p-3"><strong>However</strong> (Tuy nhiên)</td>
              </tr>
              <tr>
                 <td class="p-3 font-bold text-gray-600">Kết luận</td>
                 <td class="p-3"><strong>To sum up</strong> (Tóm lại)</td>
              </tr>
           </tbody>
        </table>
    </div>
  </div>
</div>
`;

// F2 Unit 8 Stage 2: Recognition tasks (From PDF)
const F2_UNIT8_STAGE2_QUESTIONS: Question[] = [
    // 01 Match sporting activities (Based on box and picture descriptions)
    { 
        type: 'matching', 
        part: "01 Match the different sporting activities", 
        instruction: "Match the sporting activities in the box with the pictures.",
        question: "Match the following:",
        left_items: [
            "1. (Image: Man on bike)",
            "2. (Image: Woman doing yoga)",
            "3. (Image: Man playing tennis)",
            "4. (Image: Basketball hoop)",
            "5. (Image: Man walking dog)",
            "6. (Image: Man lifting weights)"
        ],
        right_items: [
            "A. go cycling",
            "B. do yoga",
            "C. play tennis",
            "D. play basketball",
            "E. go for a walk",
            "F. do exercise"
        ],
        answer: "1-A,2-B,3-C,4-D,5-E,6-F"
    },
    // 05 Read sentences and underline correct answer
    { type: 'mcq', part: "05 Read the sentences", question: "1. We ________ wear sports clothes during sport lessons otherwise we can't take part.", options: ["have to", "don't have to"], answer: "A" },
    { type: 'mcq', part: "05 Read the sentences", question: "2. You ________ pass a swimming test to be a lifeguard at the swimming pool.", options: ["have to", "don't have to"], answer: "A" },
    { type: 'mcq', part: "05 Read the sentences", question: "3. You ________ be fit to do yoga because anyone can try it.", options: ["have to", "don't have to"], answer: "B" },
    { type: 'mcq', part: "05 Read the sentences", question: "4. You ________ spend a lot of money to stay healthy. You can go running in the park for free.", options: ["have to", "don't have to"], answer: "B" },
    { type: 'mcq', part: "05 Read the sentences", question: "5. We ________ wear special shoes when we play football. Otherwise, it is difficult to run.", options: ["have to", "don't have to"], answer: "A" },
    { type: 'mcq', part: "05 Read the sentences", question: "6. You ________ join the gym to take exercise classes, but they cost less for members.", options: ["have to", "don't have to"], answer: "B" },
    { type: 'mcq', part: "05 Read the sentences", question: "7. Professional sports players ________ practise for at least three hours a day.", options: ["have to", "don't have to"], answer: "A" },
    { type: 'mcq', part: "05 Read the sentences", question: "8. You ________ be good at sports to stay fit, but regular physical activity is good for you.", options: ["have to", "don't have to"], answer: "B" },
    
    // 08 Match the two halves
    { 
        type: 'matching', 
        part: "08 Match the two halves of the sentences", 
        instruction: "Nối hai nửa câu để tạo thành câu hoàn chỉnh.",
        question: "Match the halves:",
        left_items: [
            "1. It is a good idea to pay",
            "2. Joining the gym",
            "3. It is more fun when you go",
            "4. It is important to follow",
            "5. I think it's better to do",
            "6. Running is a"
        ],
        right_items: [
            "A. great way to keep fit.",
            "B. a healthy diet.",
            "C. for a personal trainer.",
            "D. running with other people.",
            "E. can be expensive.",
            "F. yoga than go to the gym"
        ],
        answer: "1-C,2-E,3-D,4-B,5-F,6-A"
    }
];

// F2 Unit 8 Stage 3: Practice (From PDF)
const F2_UNIT8_STAGE3_QUESTIONS: Question[] = [
    // 02 Complete sentences
    { type: 'fill', part: "02 Complete the sentences", instruction: "Complete using: get, drink, do, eat, have, join, go, play.", question: "1. It can be expensive to __________ a gym, but they often have a lot of modern equipment.", answer: "join" },
    { type: 'fill', part: "02 Complete the sentences", instruction: "Complete using verbs from the box.", question: "2. It is very important to __________ plenty of water whenever you __________ exercise.", answer: "drink|do" },
    { type: 'fill', part: "02 Complete the sentences", instruction: "Complete using verbs from the box.", question: "3. I __________ lots of fruit and vegetables and __________ yoga twice a week.", answer: "eat|do" },
    { type: 'fill', part: "02 Complete the sentences", instruction: "Complete using verbs from the box.", question: "4. I like to __________ running in the park so I can __________ some fresh air when I exercise.", answer: "go|get" },
    { type: 'fill', part: "02 Complete the sentences", instruction: "Complete using verbs from the box.", question: "5. It is a good idea to __________ a personal trainer to __________ advice about living healthily.", answer: "have|get" },
    { type: 'fill', part: "02 Complete the sentences", instruction: "Complete using verbs from the box.", question: "6. I __________ tennis three times a week and __________ for walks in the park.", answer: "play|go" },
    { type: 'fill', part: "02 Complete the sentences", instruction: "Complete using verbs from the box.", question: "7. It is important to __________ lots of sleep every night.", answer: "get" },
    { type: 'fill', part: "02 Complete the sentences", instruction: "Complete using verbs from the box.", question: "8. When you __________ green tea, it can help you relax.", answer: "drink" },
    { type: 'fill', part: "02 Complete the sentences", instruction: "Complete using verbs from the box.", question: "9. Many young people __________ a sport or do exercise at school.", answer: "play" },

    // 03 Correct/Incorrect
    { type: 'mcq', part: "03 Read the dialogues", instruction: "Decide if the sentences are correct V or incorrect X.", question: "1. A: What you should eat to be healthy?", options: ["Correct", "Incorrect"], answer: "B" },
    { type: 'fill', part: "03 Correction", instruction: "Correct the mistake for sentence 1.", question: "Correction:", answer: "What should you eat to be healthy?" },

    { type: 'mcq', part: "03 Read the dialogues", instruction: "Decide if the sentences are correct V or incorrect X.", question: "2. A: Is it important to exercise?", options: ["Correct", "Incorrect"], answer: "A" },

    { type: 'mcq', part: "03 Read the dialogues", instruction: "Decide if the sentences are correct V or incorrect X.", question: "3. B: No, you should play on your computer for so long.", options: ["Correct", "Incorrect"], answer: "B" },
    { type: 'fill', part: "03 Correction", instruction: "Correct the mistake for sentence 3.", question: "Correction:", answer: "No, you shouldn't play on your computer for so long.|No, you should not play on your computer for so long." },

    { type: 'mcq', part: "03 Read the dialogues", instruction: "Decide if the sentences are correct V or incorrect X.", question: "4. B: I think you should find ways to relax.", options: ["Correct", "Incorrect"], answer: "A" },

    { type: 'mcq', part: "03 Read the dialogues", instruction: "Decide if the sentences are correct V or incorrect X.", question: "5. B: I like doing yoga. I think you shouldn't try it.", options: ["Correct", "Incorrect"], answer: "B" },
    { type: 'fill', part: "03 Correction", instruction: "Correct the mistake for sentence 5.", question: "Correction:", answer: "I think you should try it." },

    // 04 Complete conversation
    { type: 'fill', part: "04 Complete the conversation", instruction: "Use: eat, drink, play, ride, watch, get with should/shouldn't.", question: "1. Do you know we __________ five glasses of water a day?", answer: "should drink" },
    { type: 'fill', part: "04 Complete the conversation", instruction: "Use: eat, drink, play, ride, watch, get with should/shouldn't.", question: "2. I always think I __________ more sleep.", answer: "should get" },
    { type: 'fill', part: "04 Complete the conversation", instruction: "Use: eat, drink, play, ride, watch, get with should/shouldn't.", question: "3. It said we __________ more than two to three hours a day.", answer: "shouldn't watch|should not watch" },
    { type: 'fill', part: "04 Complete the conversation", instruction: "Use: eat, drink, play, ride, watch, get with should/shouldn't.", question: "4. Well, any exercise is good. You __________ sport at school if you like it.", answer: "should play" },
    { type: 'fill', part: "04 Complete the conversation", instruction: "Use: eat, drink, play, ride, watch, get with should/shouldn't.", question: "5. If not, you __________ a bicycle or walk to school instead of going by bus or car.", answer: "should ride" },
    { type: 'fill', part: "04 Complete the conversation", instruction: "Use: eat, drink, play, ride, watch, get with should/shouldn't.", question: "6. We __________ fast food more than once a week...", answer: "shouldn't eat|should not eat" },

    // 06 Complete texts (has to/have to/doesn't have to/don't have to)
    { type: 'fill', part: "06 Complete the texts", instruction: "Use: has to / have to / doesn't have to / don't have to.", question: "1. At school, there are some new rules. The most important one is that we __________ turn off our mobile phones before the lesson.", answer: "have to" },
    { type: 'fill', part: "06 Complete the texts", instruction: "Use: has to / have to / doesn't have to / don't have to.", question: "1b. However, unlike most schools, we __________ wear school uniform every day.", answer: "don't have to" },
    { type: 'fill', part: "06 Complete the texts", instruction: "Use: has to / have to / doesn't have to / don't have to.", question: "2. At university, students can come to classes whatever time they want. They __________ come into class every morning.", answer: "don't have to" },
    { type: 'fill', part: "06 Complete the texts", instruction: "Use: has to / have to / doesn't have to / don't have to.", question: "2b. However, the university has a special rule about students who can't attend due to illness. They __________ send an email to their teacher.", answer: "have to" },

    // 07 Complete dialogue
    { type: 'fill', part: "07 Complete the dialogue", instruction: "Use: should / shouldn't / should not.", question: "1. What __________ I do?", answer: "should" },
    { type: 'fill', part: "07 Complete the dialogue", instruction: "Use: should / shouldn't / should not.", question: "2. My advice is you __________ practise as much as possible.", answer: "should" },
    { type: 'fill', part: "07 Complete the dialogue", instruction: "Use: should / shouldn't / should not.", question: "3. No, I suggest you __________ train more often.", answer: "should" },
    { type: 'fill', part: "07 Complete the dialogue", instruction: "Use: should / shouldn't / should not.", question: "4. I know I __________ have rest days when I don't practise.", answer: "should" },
    { type: 'fill', part: "07 Complete the dialogue", instruction: "Use: should / shouldn't / should not.", question: "5. Maybe not every day, but you __________ just play twice a week - that's not enough.", answer: "shouldn't|should not" },
    { type: 'fill', part: "07 Complete the dialogue", instruction: "Use: should / shouldn't / should not.", question: "6. I think you __________ have tennis lessons.", answer: "should" },
];

const F2_UNIT9_STAGE2_QUESTIONS: Question[] = [
    // Theory Check: Going to
    { type: 'mcq', part: "Phần 1: Future Plans", question: "Cấu trúc đúng của 'be going to' là gì?", options: ["S + be going to + V-ing", "S + be going to + V(infinitive)", "S + going to + V"], answer: "B" },
    { type: 'mcq', part: "Phần 1: Future Plans", question: "Chọn câu đúng:", options: ["I am going to study.", "I going to study.", "I be going to study."], answer: "A" },

    // Theory Check: Make vs Take
    { 
        type: 'matching', 
        part: "Phần 2: Collocations", 
        instruction: "Phân loại các danh từ đi với MAKE và TAKE.",
        question: "Match the phrase with the verb:",
        left_items: [
            "1. a mistake",
            "2. an exam",
            "3. a noise",
            "4. a picture"
        ],
        right_items: [
            "A. MAKE",
            "B. TAKE"
        ],
        answer: "1-A,2-B,3-A,4-B"
    },

    // Theory Check: Prepositions
    { type: 'mcq', part: "Phần 3: Prepositions", question: "Talk _____ someone.", options: ["to", "at", "on"], answer: "A" },
    { type: 'mcq', part: "Phần 3: Prepositions", question: "Communicate _____ email.", options: ["in", "by", "on"], answer: "B" },

    // Theory Check: Linking Words
    { type: 'mcq', part: "Phần 4: Linking Words", question: "Từ nào dùng để bắt đầu một danh sách ý?", options: ["Firstly", "However", "Also"], answer: "A" },
    { type: 'mcq', part: "Phần 4: Linking Words", question: "Từ nào dùng để thể hiện sự tương phản?", options: ["Furthermore", "However", "Additionally"], answer: "B" },
];

const F2_UNIT9_STAGE3_QUESTIONS: Question[] = [
    // Ex 01 Prepositions & Adverbs
    { type: 'fill', part: "01 Prepositions", instruction: "Complete: I usually communicate __________ email.", answer: "by" },
    { type: 'fill', part: "01 Prepositions", instruction: "Complete: It is best to talk __________ someone.", answer: "to|with" },
    { type: 'fill', part: "01 Prepositions", instruction: "Complete: You must be able to hold a conversation __________ someone.", answer: "with" },
    { type: 'fill', part: "01 Prepositions", instruction: "Complete: I want to have a chat __________ something.", answer: "about" },
    { type: 'fill', part: "01 Prepositions", instruction: "Complete: Do you want to discuss __________ a topic?", answer: "" }, // Blank expected or check instruction carefully. If blank is answer, system should handle empty string or explicit (none). Let's assume blank is allowed.

    // Ex 02 Match halves
    { 
        type: 'matching', 
        part: "02 Match sentence halves", 
        instruction: "Nối hai nửa câu.",
        question: "Match:",
        left_items: [
            "1. I'm going to study",
            "2. I'm going to talk",
            "3. I'm going to use",
            "4. I'm going to listen",
            "5. I'm going to keep",
            "6. I'm going to watch",
            "7. I'm going to read",
            "8. I'm going to write"
        ],
        right_items: [
            "A. to songs in English.",
            "B. with a teacher.",
            "C. newspapers.",
            "D. to people.",
            "E. emails.",
            "F. a notebook.",
            "G. videos.",
            "H. a dictionary."
        ],
        answer: "1-B,2-D,3-H,4-A,5-F,6-G,7-C,8-E" // Based on typical logic. Teacher/Classroom(B), People(D), Dictionary(H), Songs(A), Notebook(F), Videos(G), Newspapers(C), Emails(E).
    },

    // Ex 03 Going to
    { type: 'fill', part: "03 Future Plans", instruction: "Complete (- / worry): I ____________________ about my English test.", answer: "am not going to worry|'m not going to worry" },
    { type: 'fill', part: "03 Future Plans", instruction: "Complete (? / you / learn): ____________________ some French?", answer: "Are you going to learn" },
    { type: 'fill', part: "03 Future Plans", instruction: "Complete (+ / try): I ____________________ my hardest.", answer: "am going to try|'m going to try" },
    { type: 'fill', part: "03 Future Plans", instruction: "Complete (? / you / meet): ____________________ them outside?", answer: "Are you going to meet" },
    { type: 'fill', part: "03 Future Plans", instruction: "Complete (- / she / live): She ____________________ in campus.", answer: "is not going to live|isn't going to live" },

    // Ex 04 Write questions
    { type: 'fill', part: "04 Write Questions", instruction: "Write question: who / going to / do / language project with / ?", question: "Question:", answer: "Who are you going to do the language project with?" },
    { type: 'fill', part: "04 Write Questions", instruction: "Write question: where / going to / buy / a dictionary from / ?", question: "Question:", answer: "Where are you going to buy a dictionary from?" },
    { type: 'fill', part: "04 Write Questions", instruction: "Write question: how / going to / improve / your language skills / ?", question: "Question:", answer: "How are you going to improve your language skills?" },
    { type: 'fill', part: "04 Write Questions", instruction: "Write question: when / going to / tell / teacher ... / ?", question: "Question:", answer: "When are you going to tell the teacher you want to move up to a higher class?" },
    { type: 'fill', part: "04 Write Questions", instruction: "Write question: why / not going to / go university next year / ?", question: "Question:", answer: "Why are you not going to go to university next year?|Why aren't you going to go to university next year?" },

    // Ex 05 Conversation Vocab
    { type: 'fill', part: "05 Vocabulary", instruction: "Use: effort, work, advice, fun, time, skills, progress, advantage.", question: "1. ...not going to make an __________.", answer: "effort" },
    { type: 'fill', part: "05 Vocabulary", instruction: "Use word from box.", question: "2. He never does any __________.", answer: "work" },
    { type: 'fill', part: "05 Vocabulary", instruction: "Use word from box.", question: "3. I tried to give him some __________.", answer: "advice" },
    { type: 'fill', part: "05 Vocabulary", instruction: "Use word from box.", question: "4. He only wants to have __________.", answer: "fun" },
    { type: 'fill', part: "05 Vocabulary", instruction: "Use word from box.", question: "5. It takes a long __________.", answer: "time" },
    { type: 'fill', part: "05 Vocabulary", instruction: "Use word from box.", question: "6. Practise his speaking __________.", answer: "skills" },
    { type: 'fill', part: "05 Vocabulary", instruction: "Use word from box.", question: "7. More difficult to make any __________.", answer: "progress" },
    { type: 'fill', part: "05 Vocabulary", instruction: "Use word from box.", question: "8. He also has a big __________.", answer: "advantage" },

    // Ex 06 Paraphrase
    { type: 'fill', part: "06 Paraphrase", instruction: "Complete (1-3 words).", question: "1. Believes he is going to fail __________.", answer: "his exam|the exam" },
    { type: 'fill', part: "06 Paraphrase", instruction: "Complete (1-3 words).", question: "2. Didn't want to take Susan's __________.", answer: "advice" },
    { type: 'fill', part: "06 Paraphrase", instruction: "Complete (1-3 words).", question: "3. Would much rather __________.", answer: "have fun" },
    { type: 'fill', part: "06 Paraphrase", instruction: "Complete (1-3 words).", question: "4. Happens over a __________.", answer: "long time" },
    { type: 'fill', part: "06 Paraphrase", instruction: "Complete (1-3 words).", question: "5. More difficult to __________.", answer: "make progress" },
    { type: 'fill', part: "06 Paraphrase", instruction: "Complete (1-3 words).", question: "6. Advantage is that their father teaches __________.", answer: "English" },

    // Ex 08 Correct Answer
    { type: 'mcq', part: "08 Make/Take", question: "1. I am going to __________ a walk.", options: ["take", "make"], answer: "A" },
    { type: 'mcq', part: "08 Make/Take", question: "2. She thinks she __________ many mistakes.", options: ["made", "took"], answer: "A" },
    { type: 'mcq', part: "08 Make/Take", question: "3. He really __________ me laugh.", options: ["makes", "takes"], answer: "A" },
    { type: 'mcq', part: "08 Make/Take", question: "4. I always __________ lots of photos.", options: ["take", "make"], answer: "A" },
    { type: 'mcq', part: "08 Make/Take", question: "5. Don't worry about __________ mistakes.", options: ["doing", "making"], answer: "B" },

    // Ex 09 Linking Words
    { type: 'mcq', part: "09 Linking Words", instruction: "Choose correct word for [1] Start.", question: "1. [1] __________, it was a language project.", options: ["Firstly", "However"], answer: "A" },
    { type: 'mcq', part: "09 Linking Words", instruction: "Choose correct word for [4] Contrast.", question: "4. [4] __________, we didn't get any good advice.", options: ["However", "Furthermore"], answer: "A" },
    { type: 'mcq', part: "09 Linking Words", instruction: "Choose correct word for [5] Summary.", question: "5. [5] __________, she didn't help us at all.", options: ["To sum up", "Additionally"], answer: "A" },

    // Ex 10 Verb Forms
    { type: 'fill', part: "10 Verb Forms", instruction: "Complete: My father and I __________ (have) a chat tomorrow.", answer: "are going to have" },
    { type: 'fill', part: "10 Verb Forms", instruction: "Complete: We __________ (try) to decide.", answer: "are trying|try" },
    { type: 'fill', part: "10 Verb Forms", instruction: "Complete: We __________ (discuss) this last week.", answer: "discussed" },
    { type: 'fill', part: "10 Verb Forms", instruction: "Complete: No one __________ (communicate) by letter anymore.", answer: "communicates" },
];

const UNIT7_STAGE2_QUESTIONS: Question[] = [
    // --- Part 1: Subject-Verb Agreement Rules (6 questions) ---
    { type: 'tf', part: "Phần 1: Kiểm tra Luật Ngữ pháp", question: "Với chủ ngữ số ít (He, She, It), động từ thường cần thêm 's' hoặc 'es'.", answer: "Đúng" },
    { type: 'tf', part: "Phần 1: Kiểm tra Luật Ngữ pháp", question: "Sau 'A number of' (một số lượng), chúng ta dùng động từ số ít (is/has).", answer: "Sai" },
    { type: 'tf', part: "Phần 1: Kiểm tra Luật Ngữ pháp", question: "Sau 'Every' hoặc 'Each', động từ luôn ở dạng số ít.", answer: "Đúng" },
    { type: 'tf', part: "Phần 1: Kiểm tra Luật Ngữ pháp", question: "Chủ ngữ số nhiều (They, We) đi với động từ thêm 's'.", answer: "Sai" },
    { type: 'mcq', part: "Phần 1: Kiểm tra Luật Ngữ pháp", question: "Câu nào sau đây đúng ngữ pháp?", options: ["The team play well.", "The team plays well."], answer: "B" },
    { type: 'mcq', part: "Phần 1: Kiểm tra Luật Ngữ pháp", question: "Động từ 'have' đi với chủ ngữ nào?", options: ["He/She/It", "I/You/We/They"], answer: "B" },

    // --- Part 2: Ordering Events Theory (4 questions) ---
    { type: 'mcq', part: "Phần 2: Từ nối (Linkers)", question: "Từ nào thường dùng để bắt đầu một quy trình?", options: ["Finally", "Then", "First", "Next"], answer: "C" },
    { type: 'mcq', part: "Phần 2: Từ nối (Linkers)", question: "Từ nào dùng để kết thúc một quy trình?", options: ["First", "Finally", "Next", "After that"], answer: "B" },
    { type: 'tf', part: "Phần 2: Từ nối (Linkers)", question: "'Next' và 'Then' có thể dùng thay thế nhau ở giữa quy trình.", answer: "Đúng" },
    { type: 'mcq', part: "Phần 2: Từ nối (Linkers)", question: "Vị trí của từ nối thường ở đâu trong câu?", options: ["Cuối câu", "Đầu câu, trước dấu phẩy", "Giữa động từ"], answer: "B" },

    // --- Part 3: Prepositions Definitions (5 questions) ---
    { type: 'mcq', part: "Phần 3: Giới từ chỉ chuyển động", question: "Giới từ nào có nghĩa là 'đi xuyên qua' một không gian kín (như đường hầm)?", options: ["Across", "Through", "Over", "Along"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Giới từ chỉ chuyển động", question: "Giới từ nào có nghĩa là 'đi từ bên này sang bên kia' một bề mặt (như đường phố)?", options: ["Into", "Across", "Through", "Past"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Giới từ chỉ chuyển động", question: "Giới từ nào có nghĩa là 'đi vào bên trong'?", options: ["Out of", "Into", "Along", "Over"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Giới từ chỉ chuyển động", question: "Giới từ nào dùng cho hành động 'nhảy qua' vật cản?", options: ["Under", "Over", "Through", "Between"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Giới từ chỉ chuyển động", question: "'Walk along the beach' có nghĩa là gì?", options: ["Đi dọc theo bãi biển", "Đi qua bãi biển", "Đi vào bãi biển"], answer: "A" },

    // --- Part 4: Basic Application (5 questions) ---
    { type: 'mcq', part: "Phần 4: Áp dụng cơ bản", question: "Chọn động từ đúng: She ___ to school everyday.", options: ["go", "goes"], answer: "B" },
    { type: 'mcq', part: "Phần 4: Áp dụng cơ bản", question: "Chọn động từ đúng: The students ___ homework.", options: ["do", "does"], answer: "A" },
    { type: 'mcq', part: "Phần 4: Áp dụng cơ bản", question: "Chọn động từ đúng: Neither mark nor Tom ___ here.", options: ["is", "are"], answer: "A" },
    { type: 'fill', part: "Phần 4: Áp dụng cơ bản", question: "Điền từ còn thiếu: One, two, three, four. ___, five.", answer: "Finally" },
    { type: 'mcq', part: "Phần 4: Áp dụng cơ bản", question: "Chọn giới từ: The bird flew ___ the house (bay qua mái nhà).", options: ["through", "over", "into"], answer: "B" },
];

const UNIT7_STAGE3_QUESTIONS: Question[] = [
    // --- FROM OLD STAGE 2 (Basic Practice) ---
    // Bài 1A: Linkers
    { type: 'fill', part: "Phần 1: Ordering Events", instruction: "Điền từ nối thích hợp (First, Then, Next, After that, Finally).", question: "1. __________, the players warm up for ten minutes.", answer: "First" },
    { type: 'fill', part: "Phần 1: Ordering Events", instruction: "Điền từ nối thích hợp.", question: "2. __________, they start the match.", answer: "Then" },
    { type: 'fill', part: "Phần 1: Ordering Events", instruction: "Điền từ nối thích hợp.", question: "3. __________, both teams try to score a goal.", answer: "Next" },
    { type: 'fill', part: "Phần 1: Ordering Events", instruction: "Điền từ nối thích hợp.", question: "4. __________, the referee checks the time.", answer: "After that" },
    { type: 'fill', part: "Phần 1: Ordering Events", instruction: "Điền từ nối thích hợp.", question: "5. __________, the winning team gets the cup.", answer: "Finally" },
    
    // Bài 2A: S-V Agreement (Choose correct form)
    { type: 'mcq', part: "Phần 2: Subject-Verb Agreement", question: "1. The race (begin / begins) at 8 a.m.", options: ["begin", "begins"], answer: "B" },
    { type: 'mcq', part: "Phần 2: Subject-Verb Agreement", question: "2. Our football team (train / trains) every afternoon.", options: ["train", "trains"], answer: "B" },
    { type: 'mcq', part: "Phần 2: Subject-Verb Agreement", question: "3. My friend and I (play / plays) tennis twice a week.", options: ["play", "plays"], answer: "A" },
    { type: 'mcq', part: "Phần 2: Subject-Verb Agreement", question: "4. The winner (receive / receives) a gold medal.", options: ["receive", "receives"], answer: "B" },
    { type: 'mcq', part: "Phần 2: Subject-Verb Agreement", question: "5. The players (run / runs) around the field.", options: ["run", "runs"], answer: "A" },

    // Bài 2C: Advanced S-V (MCQ)
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "1. The teacher ___ very strict today.", options: ["is", "are"], answer: "A" },
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "2. My friends ___ going to the cinema tonight.", options: ["is", "are"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "3. Each student ___ a notebook.", options: ["has", "have"], answer: "A" },
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "4. The news ___ very surprising.", options: ["is", "are"], answer: "A" },
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "5. Either my mom or my sisters ___ cooking dinner.", options: ["is", "are"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "6. A number of people ___ late for the meeting.", options: ["was", "were"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "7. The pair of shoes ___ too expensive.", options: ["is", "are"], answer: "A" },
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "8. Neither the manager nor the employees ___ satisfied.", options: ["was", "were"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "9. Her smile ___ very beautiful.", options: ["is", "are"], answer: "A" },
    { type: 'mcq', part: "Phần 3: Advanced Grammar Choice", question: "10. The police ___ investigating the case.", options: ["is", "are"], answer: "B" },

    // Bài 4A: Prepositions (Fill)
    { type: 'fill', part: "Phần 4: Prepositions", instruction: "Điền giới từ: across / along / into / through / over / past / around", question: "1. The runners went __________ the bridge.", answer: "over" },
    { type: 'fill', part: "Phần 4: Prepositions", instruction: "Điền giới từ: across / along / into / through / over / past / around", question: "2. The car drove __________ the tunnel.", answer: "through" },
    { type: 'fill', part: "Phần 4: Prepositions", instruction: "Điền giới từ: across / along / into / through / over / past / around", question: "3. We walked __________ the river to reach the stadium.", answer: "across" },
    { type: 'fill', part: "Phần 4: Prepositions", instruction: "Điền giới từ: across / along / into / through / over / past / around", question: "4. The cyclist rode __________ the street and turned left.", answer: "along" },
    { type: 'fill', part: "Phần 4: Prepositions", instruction: "Điền giới từ: across / along / into / through / over / past / around", question: "5. The football rolled __________ the goal.", answer: "into" },
    { type: 'fill', part: "Phần 4: Prepositions", instruction: "Điền giới từ: across / along / into / through / over / past / around", question: "6. They ran __________ the park to the finish line.", answer: "around" },

    // --- FROM OLD STAGE 3 (Advanced Practice) ---
    // Bài 1B: Writing Process
    { type: 'fill', part: "Phần 5: Writing", instruction: "Viết 3-4 câu miêu tả một quá trình đơn giản (ví dụ: How to prepare for a football match). Sử dụng: First, Then, After that, Finally.", question: "Viết đoạn văn ngắn của bạn:", answer: "Câu trả lời mở, cần có các từ nối chỉ trình tự." },

    // Bài 2B: Error Correction
    { type: 'error-correction', part: "Phần 6: Error Correction", instruction: "Sửa lỗi sai trong câu.", question: "1. The athlete run very fast.", answer: "run|runs" },
    { type: 'error-correction', part: "Phần 6: Error Correction", instruction: "Sửa lỗi sai trong câu.", question: "2. My coach help me before the match.", answer: "help|helps" },
    { type: 'error-correction', part: "Phần 6: Error Correction", instruction: "Sửa lỗi sai trong câu.", question: "3. The footballers plays in the new stadium.", answer: "plays|play" },

    // Bài 2D: Conjugation (Fill form)
    { type: 'fill', part: "Phần 7: Chia động từ", question: "1. The books on the table ___ (belong) to my brother.", answer: "belong" },
    { type: 'fill', part: "Phần 7: Chia động từ", question: "2. Everyone ___ (want) to get good grades.", answer: "wants" },
    { type: 'fill', part: "Phần 7: Chia động từ", question: "3. The quality of these products ___ (be) excellent.", answer: "is" },
    { type: 'fill', part: "Phần 7: Chia động từ", question: "4. Ten dollars ___ (be) not enough for lunch.", answer: "is" },
    { type: 'fill', part: "Phần 7: Chia động từ", question: "5. My family ___ (live) in Ho Chi Minh City.", answer: "lives" },
    { type: 'fill', part: "Phần 7: Chia động từ", question: "6. Neither of the answers ___ (be) correct.", answer: "is" },
    { type: 'fill', part: "Phần 7: Chia động từ", question: "7. The group of students ___ (meet) their teacher today.", answer: "meets" },
    { type: 'fill', part: "Phần 7: Chia động từ", question: "8. Mathematics ___ (be) my favourite subject.", answer: "is" },
    { type: 'fill', part: "Phần 7: Chia động từ", question: "9. Some of the milk ___ (spill) on the floor.", answer: "has spilled" },
    { type: 'fill', part: "Phần 7: Chia động từ", question: "10. The children ___ (play) in the yard right now.", answer: "are playing" },

    // Bài 3: Reordering
    { type: 'fill', part: "Phần 8: Sentence Building", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "1. have / won / already / They / three / medals / .", answer: "They have already won three medals." },
    { type: 'fill', part: "Phần 8: Sentence Building", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "2. I / played / have / tennis / for / two / years / .", answer: "I have played tennis for two years." },
    { type: 'fill', part: "Phần 8: Sentence Building", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "3. Has / ever / he / competed / abroad / ?", answer: "Has he ever competed abroad?" },
    { type: 'fill', part: "Phần 8: Sentence Building", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "4. haven’t / tried / We / skydiving / yet / .", answer: "We haven’t tried skydiving yet." },
    { type: 'fill', part: "Phần 8: Sentence Building", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "5. has / She / joined / never / a / football / club / .", answer: "She has never joined a football club." },

    // Bài 4B: Translation
    { type: 'fill', part: "Phần 9: Translation", instruction: "Dịch sang tiếng Anh.", question: "1. Cầu thủ chạy qua sân rất nhanh.", answer: "The player ran across the field very fast." },
    { type: 'fill', part: "Phần 9: Translation", instruction: "Dịch sang tiếng Anh.", question: "2. Cô ấy nhảy qua hàng rào để đến đích.", answer: "She jumped over the fence to reach the finish line." },
    { type: 'fill', part: "Phần 9: Translation", instruction: "Dịch sang tiếng Anh.", question: "3. Họ đi xuyên qua rừng để đến sân vận động.", answer: "They walked through the forest to get to the stadium." },
];

const UNIT8_STAGE2_QUESTIONS: Question[] = [
    // --- Multi-word Verbs MCQ ---
    { type: 'mcq', part: "Phần 1: Multi-word Verbs", question: "I don’t earn much, but I can ________ .", options: ["carry on", "get by", "find out"], answer: "B" },
    { type: 'mcq', part: "Phần 1: Multi-word Verbs", question: "Please ________ the important dates in your diary.", options: ["note down", "run out of", "take up"], answer: "A" },
    { type: 'mcq', part: "Phần 1: Multi-word Verbs", question: "We have ________ paper in the printer!", options: ["found out", "got on", "run out of"], answer: "C" },
    { type: 'mcq', part: "Phần 1: Multi-word Verbs", question: "The students didn’t stop; they ________ with the test.", options: ["carried on", "ran out", "got on"], answer: "A" },

    // --- Multi-word Verbs Fill ---
    { type: 'fill', part: "Phần 2: Hoàn thành câu (Multi-word Verbs)", instruction: "Điền: find out / note down / carry on with / get on with / run out of", question: "1. We __________ milk. Can you go to the shop?", answer: "ran out of|run out of" },
    { type: 'fill', part: "Phần 2: Hoàn thành câu (Multi-word Verbs)", instruction: "Điền: find out / note down / carry on with / get on with / run out of", question: "2. She __________ her notes before the meeting.", answer: "noted down" },
    { type: 'fill', part: "Phần 2: Hoàn thành câu (Multi-word Verbs)", instruction: "Điền: find out / note down / carry on with / get on with / run out of", question: "3. They __________ the project although it was difficult.", answer: "carried on with" },
    { type: 'fill', part: "Phần 2: Hoàn thành câu (Multi-word Verbs)", instruction: "Điền: find out / note down / carry on with / get on with / run out of", question: "4. I want to __________ what time the meeting starts.", answer: "find out" },
    { type: 'fill', part: "Phần 2: Hoàn thành câu (Multi-word Verbs)", instruction: "Điền: find out / note down / carry on with / get on with / run out of", question: "5. Tom doesn’t __________ his new manager.", answer: "get on with" },

    // --- Comparatives MCQ ---
    { type: 'mcq', part: "Phần 3: So sánh (Comparatives)", question: "My manager is ________ than yours.", options: ["more friendly", "friendlier", "the friendliest"], answer: "B" },
    { type: 'mcq', part: "Phần 3: So sánh (Comparatives)", question: "This year’s profit is ________ than last year’s.", options: ["good", "better", "best"], answer: "B" },
    { type: 'mcq', part: "Phần 3: So sánh (Comparatives)", question: "She is ________ person in the company.", options: ["more intelligent", "the most intelligent", "most intelligent"], answer: "B" },

    // --- Pre-writing Tenses ---
    { type: 'fill', part: "Phần 4: Chia thì (Past/Present)", instruction: "Chia thì đúng.", question: "1. Google __________ (start) in 1998.", answer: "started" },
    { type: 'fill', part: "Phần 4: Chia thì (Past/Present)", instruction: "Chia thì đúng.", question: "2. Larry and Sergey __________ (be) students then.", answer: "were" },
    { type: 'fill', part: "Phần 4: Chia thì (Past/Present)", instruction: "Chia thì đúng.", question: "3. Today, Google __________ (employ) many people.", answer: "employs" },
    { type: 'fill', part: "Phần 4: Chia thì (Past/Present)", instruction: "Chia thì đúng.", question: "4. They __________ (create) it when they were young.", answer: "created" },
    { type: 'fill', part: "Phần 4: Chia thì (Past/Present)", instruction: "Chia thì đúng.", question: "5. Google __________ (be) very successful now.", answer: "is" },
];

const UNIT8_STAGE3_QUESTIONS: Question[] = [
    // --- MWV Translation ---
    { type: 'fill', part: "Bài 1: Dịch thuật (Multi-word Verbs)", instruction: "Dịch sang tiếng Anh.", question: "1. Tôi đã ghi lại tất cả thông tin trong sổ.", answer: "I noted down all the information in my notebook." },
    { type: 'fill', part: "Bài 1: Dịch thuật (Multi-word Verbs)", instruction: "Dịch sang tiếng Anh.", question: "2. Chúng tôi hết tiền rồi.", answer: "We ran out of money." },
    { type: 'fill', part: "Bài 1: Dịch thuật (Multi-word Verbs)", instruction: "Dịch sang tiếng Anh.", question: "3. Anh ấy hòa thuận với tất cả đồng nghiệp.", answer: "He gets on well with all his colleagues." },
    { type: 'fill', part: "Bài 1: Dịch thuật (Multi-word Verbs)", instruction: "Dịch sang tiếng Anh.", question: "4. Cô ấy tiếp tục làm việc dù rất mệt.", answer: "She carried on with her work even though she was tired." },
    { type: 'fill', part: "Bài 1: Dịch thuật (Multi-word Verbs)", instruction: "Dịch sang tiếng Anh.", question: "5. Tôi muốn tìm ra lý do của vấn đề.", answer: "I want to find out the reason for the problem." },

    // --- Comparatives Forms ---
    { type: 'fill', part: "Bài 2: Dạng so sánh", instruction: "Điền dạng đúng của từ trong ngoặc.", question: "1. This company is __________ (big) than ours.", answer: "bigger" },
    { type: 'fill', part: "Bài 2: Dạng so sánh", instruction: "Điền dạng đúng của từ trong ngoặc.", question: "2. My job is __________ (interesting) than yours.", answer: "more interesting" },
    { type: 'fill', part: "Bài 2: Dạng so sánh", instruction: "Điền dạng đúng của từ trong ngoặc.", question: "3. She is the __________ (careful) person in the team.", answer: "most careful" },
    { type: 'fill', part: "Bài 2: Dạng so sánh", instruction: "Điền dạng đúng của từ trong ngoặc.", question: "4. Today is __________ (bad) than yesterday.", answer: "worse" },
    { type: 'fill', part: "Bài 2: Dạng so sánh", instruction: "Điền dạng đúng của từ trong ngoặc.", question: "5. He is __________ (successful) manager I know.", answer: "the most successful" },

    // --- Comparatives Rewrite ---
    { type: 'fill', part: "Bài 3: Viết lại câu", instruction: "Viết lại câu dùng so sánh hơn.", question: "1. This office is large. That one is small. → This office is __________ than that one.", answer: "larger" },
    { type: 'fill', part: "Bài 3: Viết lại câu", instruction: "Viết lại câu dùng so sánh bằng (negative).", question: "2. Mary works hard. Peter works harder. → Mary doesn’t work __________ Peter.", answer: "as hard as" },
    { type: 'fill', part: "Bài 3: Viết lại câu", instruction: "Viết lại câu dùng so sánh bằng.", question: "3. My job is interesting. Your job is interesting too. → My job is __________ your job.", answer: "as interesting as" },

    // --- Comparatives Translation ---
    { type: 'fill', part: "Bài 4: Dịch thuật (Comparatives)", instruction: "Dịch sang tiếng Anh.", question: "1. Công ty này lớn hơn công ty cũ của tôi.", answer: "This company is bigger than my old one." },
    { type: 'fill', part: "Bài 4: Dịch thuật (Comparatives)", instruction: "Dịch sang tiếng Anh.", question: "2. Đây là người quản lý tốt nhất mà tôi từng gặp.", answer: "This is the best manager I’ve ever met." },
    { type: 'fill', part: "Bài 4: Dịch thuật (Comparatives)", instruction: "Dịch sang tiếng Anh.", question: "3. Ngành công nghiệp phần mềm đang phát triển nhanh hơn bao giờ hết.", answer: "The software industry is growing faster than ever." },

    // --- Writing Tasks ---
    { type: 'fill', part: "Bài 5: Writing (Combine sentences)", instruction: "Nối 2 câu dùng 'when'.", question: "1. She got her first job. She was only 18.", answer: "She got her first job when she was only 18." },
    { type: 'fill', part: "Bài 5: Writing (Combine sentences)", instruction: "Nối 2 câu dùng 'when'.", question: "2. They opened the first store. They were in London.", answer: "They opened the first store when they were in London." },
    { type: 'fill', part: "Bài 5: Writing (Combine sentences)", instruction: "Nối 2 câu dùng 'when'.", question: "3. He became a manager. He was 25 years old.", answer: "He became a manager when he was 25 years old." },
    { type: 'fill', part: "Bài 5: Writing (Combine sentences)", instruction: "Nối 2 câu dùng 'when'.", question: "4. The company expanded. It was 2010.", answer: "The company expanded when it was 2010." },

    { type: 'fill', part: "Bài 6: Writing (Add detail)", instruction: "Viết lại câu chi tiết hơn (thêm thời gian/địa điểm/lý do).", question: "1. The company became successful.", answer: "Mở rộng câu (ví dụ: The company became successful after two years)." },
    { type: 'fill', part: "Bài 6: Writing (Add detail)", instruction: "Viết lại câu chi tiết hơn.", question: "2. She started her own business.", answer: "Mở rộng câu (ví dụ: She started her own business when she finished university)." },
    { type: 'fill', part: "Bài 6: Writing (Add detail)", instruction: "Viết lại câu chi tiết hơn.", question: "3. They worked hard.", answer: "Mở rộng câu (ví dụ: They worked hard to succeed)." },
    { type: 'fill', part: "Bài 6: Writing (Add detail)", instruction: "Viết lại câu chi tiết hơn.", question: "4. He opened the first shop.", answer: "Mở rộng câu (ví dụ: He opened the first shop in London in 2012)." },
];

const UNIT9_STAGE2_QUESTIONS: Question[] = [
    // --- Part 1: Possessives & Pronouns (MCQ) ---
    { type: 'mcq', part: "Phần 1: Pronouns", question: "____ brother works in a hospital.", options: ["My", "I"], answer: "A" },
    { type: 'mcq', part: "Phần 1: Pronouns", question: "That’s ____ car. It’s very old.", options: ["our", "us"], answer: "A" },
    { type: 'mcq', part: "Phần 1: Pronouns", question: "Is this ____ pen?", options: ["you", "your"], answer: "B" },
    { type: 'mcq', part: "Phần 1: Pronouns", question: "They love ____ new school.", options: ["their", "them"], answer: "A" },
    { type: 'mcq', part: "Phần 1: Pronouns", question: "The dog is eating ____ food.", options: ["its", "it"], answer: "A" },
    
    // --- Part 2: Subject/Object Pronouns (Fill) ---
    { type: 'fill', part: "Phần 2: Subject & Object Pronouns", instruction: "Điền đại từ (I, me, he, him, she, her...)", question: "1. This is Anna. Do you know ____?", answer: "her" },
    { type: 'fill', part: "Phần 2: Subject & Object Pronouns", instruction: "Điền đại từ.", question: "2. Peter is nice. I like ____ a lot.", answer: "him" },
    { type: 'fill', part: "Phần 2: Subject & Object Pronouns", instruction: "Điền đại từ.", question: "3. John and I are friends. Come with ____!", answer: "us" },
    { type: 'fill', part: "Phần 2: Subject & Object Pronouns", instruction: "Điền đại từ.", question: "4. ____ are my teachers. I see them every day.", answer: "They" },
    { type: 'fill', part: "Phần 2: Subject & Object Pronouns", instruction: "Điền đại từ.", question: "5. Where is my book? I can’t find ____!", answer: "it" },

    // --- Part 3: -ED / -ING Adjectives (MCQ) ---
    { type: 'mcq', part: "Phần 3: Adjectives (-ed vs -ing)", question: "The test was really ________.", options: ["tired", "tiring"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Adjectives (-ed vs -ing)", question: "I’m ________ because there’s nothing to do.", options: ["bored", "boring"], answer: "A" },
    { type: 'mcq', part: "Phần 3: Adjectives (-ed vs -ing)", question: "That was a very ________ game!", options: ["excited", "exciting"], answer: "B" },
    { type: 'mcq', part: "Phần 3: Adjectives (-ed vs -ing)", question: "She felt ________ when she heard the news.", options: ["shocked", "shocking"], answer: "A" },
    { type: 'mcq', part: "Phần 3: Adjectives (-ed vs -ing)", question: "His story was so ________.", options: ["fascinated", "fascinating"], answer: "B" },

    // --- Part 4: Describing Objects (Fill/MCQ) ---
    { type: 'mcq', part: "Phần 4: Describing Objects", question: "A broom ________ sweeping the floor.", options: ["is used for", "is used to"], answer: "A" },
    { type: 'mcq', part: "Phần 4: Describing Objects", question: "A spoon ________ metal.", options: ["is made of", "is made from"], answer: "A" },
    { type: 'mcq', part: "Phần 4: Describing Objects", question: "This machine ________ make coffee.", options: ["is used for", "lets you"], answer: "B" },
    { type: 'fill', part: "Phần 4: Describing Objects", instruction: "Điền từ: is used for / has", question: "4. The ruler ________ measuring straight lines.", answer: "is used for" },
    { type: 'fill', part: "Phần 4: Describing Objects", instruction: "Điền từ: is used for / has", question: "5. The radio ________ two main parts.", answer: "has" },

    // --- Part 5: Describing People (Fill) ---
    { type: 'fill', part: "Phần 5: Describing People", instruction: "Điền tính từ: kind, intelligent, calm, honest, patient", question: "1. My teacher is very ________. She never gets angry easily.", answer: "calm" },
    { type: 'fill', part: "Phần 5: Describing People", instruction: "Điền tính từ.", question: "2. My dad is ________. He always helps other people.", answer: "kind" },
    { type: 'fill', part: "Phần 5: Describing People", instruction: "Điền tính từ.", question: "3. My sister is ________. She tells the truth all the time.", answer: "honest" },
    { type: 'fill', part: "Phần 5: Describing People", instruction: "Điền tính từ.", question: "4. My friend is really ________. He can solve problems quickly.", answer: "intelligent" },
    { type: 'fill', part: "Phần 5: Describing People", instruction: "Điền tính từ.", question: "5. The doctor is very ________. She listens carefully to every patient.", answer: "patient" },
];

const UNIT9_STAGE3_QUESTIONS: Question[] = [
    // --- Guided Writing ---
    { type: 'fill', part: "Bài 1: Guided Writing", instruction: "Viết câu hoàn chỉnh dựa trên gợi ý. Ex: admire / mother / hardworking -> I admire my mother because she is hardworking.", question: "1. admire / teacher / kind ->", answer: "I admire my teacher because she is kind." },
    { type: 'fill', part: "Bài 1: Guided Writing", instruction: "Viết câu hoàn chỉnh.", question: "2. respect / father / honest and patient ->", answer: "I respect my father because he is honest and patient." },
    { type: 'fill', part: "Bài 1: Guided Writing", instruction: "Viết câu hoàn chỉnh.", question: "3. admire / friend / talented singer ->", answer: "I admire my friend because she is a talented singer." },
    
    // --- Translation Tasks ---
    { type: 'fill', part: "Bài 2: Translation", instruction: "Dịch sang tiếng Anh.", question: "1. Cái ghế này được làm bằng gỗ.", answer: "This chair is made of wood." },
    { type: 'fill', part: "Bài 2: Translation", instruction: "Dịch sang tiếng Anh.", question: "2. Máy tính này giúp bạn học tiếng Anh.", answer: "This computer lets you learn English." },
    { type: 'fill', part: "Bài 2: Translation", instruction: "Dịch sang tiếng Anh.", question: "3. Bộ phim này rất chán.", answer: "This movie is boring." },
    { type: 'fill', part: "Bài 2: Translation", instruction: "Dịch sang tiếng Anh.", question: "4. Tôi cảm thấy hào hứng về chuyến đi.", answer: "I feel excited about the trip." },
    { type: 'fill', part: "Bài 2: Translation", instruction: "Dịch sang tiếng Anh.", question: "5. Đây là sách của tôi. Trả lại nó cho tôi.", answer: "This is my book. Give it back to me." },

    // --- Error Correction ---
    { type: 'error-correction', part: "Bài 3: Error Correction", instruction: "Sửa lỗi sai trong câu.", question: "1. I am boring with this class.", answer: "boring|bored" },
    { type: 'error-correction', part: "Bài 3: Error Correction", instruction: "Sửa lỗi sai trong câu.", question: "2. She likes he very much.", answer: "he|him" },
    { type: 'error-correction', part: "Bài 3: Error Correction", instruction: "Sửa lỗi sai trong câu.", question: "3. Is this you pen?", answer: "you|your" },
    { type: 'error-correction', part: "Bài 3: Error Correction", instruction: "Sửa lỗi sai trong câu.", question: "4. The film was tired.", answer: "tired|tiring" },
];

const UNIT10_STAGE2_QUESTIONS: Question[] = [
    // --- Part 1: Matching Halves (Theory Exercise 1b) ---
    { 
        type: 'matching', 
        part: "Phần 1: Conditionals Matching", 
        instruction: "Nối hai vế câu điều kiện cho phù hợp.",
        question: "Match the following:",
        left_items: [
            "1. If scientists find life on Mars,",
            "2. If I were an astronaut,",
            "3. If we study astronomy,",
            "4. If there were more space research,"
        ],
        right_items: [
            "A. people would understand the universe better.",
            "B. I would love to explore other planets.",
            "C. we will learn about stars and galaxies.",
            "D. they will tell the world."
        ],
        answer: "1-D,2-B,3-C,4-A"
    },

    // --- Part 2: Conditionals Open Cloze (Theory Exercise 1c) ---
    { type: 'open_cloze', part: "Phần 2: Verb Forms (Type 1 & 2)", instruction: "Điền động từ đúng dạng vào chỗ trống. VD: sent|will collect", paragraph: "1. If we (1)______ (send) robots to the Moon, they (2)______ (collect) data.", answer: "send|will collect" },
    { type: 'open_cloze', part: "Phần 2: Verb Forms (Type 1 & 2)", instruction: "Điền động từ đúng dạng vào chỗ trống.", paragraph: "2. If I (1)______ (see) an alien, I (2)______ (take) a photo!", answer: "saw|would take" },
    { type: 'open_cloze', part: "Phần 2: Verb Forms (Type 1 & 2)", instruction: "Điền động từ đúng dạng vào chỗ trống.", paragraph: "3. If there (1)______ (be) no Sun, life (2)______ (not / exist).", answer: "were|would not exist" },
    { type: 'open_cloze', part: "Phần 2: Verb Forms (Type 1 & 2)", instruction: "Điền động từ đúng dạng vào chỗ trống.", paragraph: "4. If I (1)______ (travel) to space, I (2)______ (feel) excited.", answer: "travelled|would feel" },

    // --- Part 3: Infinitive of Purpose (Theory Exercise 2) ---
    { type: 'fill', part: "Phần 3: Infinitive of Purpose", instruction: "Hoàn thành câu với 'to + V' (study, protect, see, do).", question: "1. Scientists build rockets ______ the universe.", answer: "to study" },
    { type: 'fill', part: "Phần 3: Infinitive of Purpose", instruction: "Hoàn thành câu với 'to + V'.", question: "2. Astronauts wear suits ______ themselves.", answer: "to protect" },
    { type: 'fill', part: "Phần 3: Infinitive of Purpose", instruction: "Hoàn thành câu với 'to + V'.", question: "3. We use telescopes ______ distant stars.", answer: "to see" },
    { type: 'fill', part: "Phần 3: Infinitive of Purpose", instruction: "Hoàn thành câu với 'to + V'.", question: "4. They travel to space ______ research.", answer: "to do" },

    // --- Part 4: Developing Sentence Structure (Theory Rewrite) ---
    { type: 'fill', part: "Phần 4: Developing Sentence Structure", instruction: "Viết lại câu bằng cách thêm cụm mở đầu: 'Scientists believe that...'", question: "1. There may be life on other planets. →", answer: "Scientists believe that there may be life on other planets." },
    { type: 'fill', part: "Phần 4: Developing Sentence Structure", instruction: "Viết lại câu bằng cách thêm cụm mở đầu: 'Studies show that...'", question: "2. The Earth is getting hotter. →", answer: "Studies show that the Earth is getting hotter." },
    { type: 'fill', part: "Phần 4: Developing Sentence Structure", instruction: "Viết lại câu bằng cách thêm cụm mở đầu: 'Some people think that...'", question: "3. Humans will live on Mars one day. →", answer: "Some people think that humans will live on Mars one day." },
    
    // --- Part 5: Should & Important (Theory Rewrite) ---
    { type: 'fill', part: "Phần 5: Should & It is important to", instruction: "Viết lại câu dùng 'should'.", question: "1. (study astronomy) →", answer: "We should study astronomy." },
    { type: 'fill', part: "Phần 5: Should & It is important to", instruction: "Viết lại câu dùng 'It is important to'.", question: "2. (save money for space research) →", answer: "It is important to save money for space research." },
    { type: 'fill', part: "Phần 5: Should & It is important to", instruction: "Viết lại câu dùng 'should not'.", question: "3. (not forget about the Earth) →", answer: "We should not forget about the Earth." },
    { type: 'fill', part: "Phần 5: Should & It is important to", instruction: "Viết lại câu dùng 'It is important to'.", question: "4. (protect our atmosphere) →", answer: "It is important to protect our atmosphere." },
];

const UNIT10_STAGE3_QUESTIONS: Question[] = [
    // --- Part 1: Sentence Ordering ---
    { type: 'fill', part: "Bài 1: Sentence Ordering", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "1. houses / there will be / by 2050 / on the moon / Scientists believe that /.", answer: "Scientists believe that there will be houses on the moon by 2050." },
    { type: 'fill', part: "Bài 1: Sentence Ordering", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "2. Reports show that / is / Pluto / not a planet /.", answer: "Reports show that Pluto is not a planet." },
    { type: 'fill', part: "Bài 1: Sentence Ordering", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "3. Some people think that / TV programmes / are / a good way to learn about science /.", answer: "Some people think that TV programmes are a good way to learn about science." },
    { type: 'fill', part: "Bài 1: Sentence Ordering", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "4. Scientists believe that / we / need / to study / whether people can live in space /.", answer: "Scientists believe that we need to study whether people can live in space." },
    { type: 'fill', part: "Bài 1: Sentence Ordering", instruction: "Sắp xếp từ thành câu hoàn chỉnh.", question: "5. Studies suggest that / could exist / life / on other planets /.", answer: "Studies suggest that life could exist on other planets." },

    // --- Part 2: Sentence Building Practice (Open-Ended) ---
    { type: 'fill', part: "Bài 2: Sentence Building Practice", instruction: "Hoàn thành câu theo ý của bạn.", question: "1. Some people think that _____________________________.", answer: "Open Answer" },
    { type: 'fill', part: "Bài 2: Sentence Building Practice", instruction: "Hoàn thành câu theo ý của bạn.", question: "2. Scientists believe that _____________________________.", answer: "Open Answer" },
    { type: 'fill', part: "Bài 2: Sentence Building Practice", instruction: "Hoàn thành câu theo ý của bạn.", question: "3. Reports show that _____________________________.", answer: "Open Answer" },
    { type: 'fill', part: "Bài 2: Sentence Building Practice", instruction: "Hoàn thành câu theo ý của bạn.", question: "4. Studies suggest that _____________________________.", answer: "Open Answer" },

    // --- Part 3: Grammar for Writing (Fill) ---
    { type: 'fill', part: "Bài 3: Grammar for Writing", instruction: "Điền 'should' hoặc 'It is important to'.", question: "1. We __________ study space to understand our universe.", answer: "should" },
    { type: 'fill', part: "Bài 3: Grammar for Writing", instruction: "Điền 'should' hoặc 'It is important to'.", question: "2. __________ protect the Earth before exploring other planets.", answer: "It is important to" },
    { type: 'fill', part: "Bài 3: Grammar for Writing", instruction: "Điền 'should' hoặc 'It is important to'.", question: "3. Governments __________ not spend too much money on space projects.", answer: "should" },
    { type: 'fill', part: "Bài 3: Grammar for Writing", instruction: "Điền 'should' hoặc 'It is important to'.", question: "4. __________ support scientists in their space research.", answer: "It is important to" },
];

// Hàm helper để tạo câu hỏi placeholder cho các bài chưa có nội dung
const createPlaceholderQuestions = (unit: number, lesson: number, stage: string): Question[] => [
    {
        type: 'mcq',
        part: `Phần 1: Demo Unit ${unit} - Lesson ${lesson}`,
        question: `Đây là câu hỏi mẫu cho ${stage}. Nội dung đang được cập nhật.`,
        options: ["Option A", "Option B", "Option C"],
        answer: "A"
    }
];

export const LESSON_LIBRARY: Lesson[] = [];

// --- GENERATE FOUNDATION 01 (Existing 10 units) ---
for (let unit = 1; unit <= 10; unit++) {
    // Tạo 2 lesson cho mỗi unit để demo
    for (let lesson = 1; lesson <= 2; lesson++) {
        // SPECIAL LOGIC FOR UNIT 7, 8, 9, 10: ONLY 1 LESSON
        if ((unit === 7 || unit === 8 || unit === 9 || unit === 10) && lesson === 2) continue; 

        const lessonId = `f1-unit${unit}-lesson${lesson}`;
        const book = 'Foundation 01';
        
        if (unit === 6 && lesson === 1) {
            LESSON_LIBRARY.push({
                id: lessonId,
                book,
                unitNumber: unit,
                lessonNumber: lesson,
                title: "Temperature, Graphs & Comparisons",
                description: "Học cách miêu tả biểu đồ nhiệt độ và các cấu trúc so sánh.",
                theoryContent: UNIT6_LESSON1_THEORY,
                stage2Questions: STAGE2_QUESTIONS,
                stage3Questions: STAGE3_QUESTIONS
            });
        } else if (unit === 7 && lesson === 1) {
            LESSON_LIBRARY.push({
                id: lessonId,
                book,
                unitNumber: unit,
                lessonNumber: lesson,
                title: "Sports & Action: Grammar Practice",
                description: "Luyện tập về Trình tự sự kiện, Hòa hợp chủ ngữ-động từ và Thì hiện tại hoàn thành.",
                theoryContent: UNIT7_THEORY,
                stage2Questions: UNIT7_STAGE2_QUESTIONS,
                stage3Questions: UNIT7_STAGE3_QUESTIONS
            });
        } else if (unit === 8 && lesson === 1) {
             LESSON_LIBRARY.push({
                id: lessonId,
                book,
                unitNumber: unit,
                lessonNumber: lesson,
                title: "Multi-word Verbs & Comparatives",
                description: "Luyện tập cụm động từ (Phrasal Verbs), So sánh và Kỹ năng Viết.",
                theoryContent: UNIT8_THEORY,
                stage2Questions: UNIT8_STAGE2_QUESTIONS,
                stage3Questions: UNIT8_STAGE3_QUESTIONS
            });
        } else if (unit === 9 && lesson === 1) {
             LESSON_LIBRARY.push({
                id: lessonId,
                book,
                unitNumber: unit,
                lessonNumber: lesson,
                title: "Pronouns, Adjectives & Descriptions",
                description: "Học về Đại từ, Tính từ đuôi -ed/-ing và cách miêu tả đồ vật/con người.",
                theoryContent: UNIT9_THEORY,
                stage2Questions: UNIT9_STAGE2_QUESTIONS,
                stage3Questions: UNIT9_STAGE3_QUESTIONS
            });
        } else if (unit === 10 && lesson === 1) {
             LESSON_LIBRARY.push({
                id: lessonId,
                book,
                unitNumber: unit,
                lessonNumber: lesson,
                title: "Conditionals & Future Structures",
                description: "Học về Câu điều kiện (Loại 1 & 2), Động từ chỉ mục đích và Cấu trúc viết học thuật.",
                theoryContent: UNIT10_THEORY,
                stage2Questions: UNIT10_STAGE2_QUESTIONS,
                stage3Questions: UNIT10_STAGE3_QUESTIONS
            });
        } else {
             // Chỉ hiển thị lesson 1 cho các unit khác để danh sách gọn gàng
             if (lesson === 1) {
                LESSON_LIBRARY.push({
                    id: lessonId,
                    book,
                    unitNumber: unit,
                    lessonNumber: lesson,
                    title: `Unit ${unit} - Lesson ${lesson} (Chưa có nội dung)`,
                    description: "Nội dung bài học này sẽ sớm được cập nhật.",
                    stage2Questions: createPlaceholderQuestions(unit, lesson, 'Lý thuyết'),
                    stage3Questions: createPlaceholderQuestions(unit, lesson, 'Thực hành')
                });
             }
        }
    }
}

// --- GENERATE FOUNDATION 02 (New Book) ---
// Adding specific Unit 8 for Foundation 02
LESSON_LIBRARY.push({
    id: 'f2-unit8-lesson1',
    book: 'Foundation 02',
    unitNumber: 8,
    lessonNumber: 1,
    title: "Health and Medicine",
    description: "Học từ vựng về Thể thao & Sức khỏe, Modals (Should/Have to).",
    theoryContent: F2_UNIT8_THEORY,
    stage2Questions: F2_UNIT8_STAGE2_QUESTIONS,
    stage3Questions: F2_UNIT8_STAGE3_QUESTIONS
});

// Adding specific Unit 9 for Foundation 02
LESSON_LIBRARY.push({
    id: 'f2-unit9-lesson1',
    book: 'Foundation 02',
    unitNumber: 9,
    lessonNumber: 1,
    title: "Language",
    description: "Vocabulary: Communication. Grammar: Future plans (going to), Collocations, Linking words.",
    theoryContent: F2_UNIT9_THEORY,
    stage2Questions: F2_UNIT9_STAGE2_QUESTIONS,
    stage3Questions: F2_UNIT9_STAGE3_QUESTIONS
});

// Generate placeholders for other F2 units
for (let unit = 1; unit <= 10; unit++) {
    if (unit === 8 || unit === 9) continue; // Skip Unit 8 & 9
    LESSON_LIBRARY.push({
        id: `f2-unit${unit}-lesson1`,
        book: 'Foundation 02',
        unitNumber: unit,
        lessonNumber: 1,
        title: `Unit ${unit} - Lesson 1 (Chưa có nội dung)`,
        description: "Nội dung bài học này sẽ sớm được cập nhật.",
        stage2Questions: createPlaceholderQuestions(unit, 1, 'Lý thuyết'),
        stage3Questions: createPlaceholderQuestions(unit, 1, 'Thực hành')
    });
}


// Helper để lấy bài học theo ID
export const getLessonById = (id: string): Lesson | undefined => {
    return LESSON_LIBRARY.find(l => l.id === id);
};