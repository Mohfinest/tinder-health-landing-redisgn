/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail } from 'lucide-react';

export default function Team() {
  const members = [
    {
      name: 'Lilian Damisa',
      role: 'AI/ML Engineer',
      email: 'lilydamisa@gmail.com',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvtWmE2EFRiXcRk_vFFsHFG7Nbz2ndtpUBU3ajNIfFMgblZcPc7hsYidZkhRiVpwzT3R6ZDfahF1a0YUYMhCqWaifXT4DOFZnpwHNdBF_O2H8iipGq_abQnhsWbw9X4C5Wuj7UHUAtJ5Uw2GlcHiH6aSa2W9UUYCdu738zT3RoeB9d3Fx1gQfB1MYi0IUKgknHu640Biv-8ObVqfqsw318JAEWJx3SRUutoldMuAj3RixFHuilqvLVFGeuPpmdSki03qJv7suRqC2G'
    },
    {
      name: 'Musa Abdulmumin',
      role: 'AI/ML & Digital Storytelling Lead',
      email: 'Abdulmuminm97@gmail.com',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLM1ZA2zh1jzHQ0KcdNc4gA7NRgtJ2kCfYilWFnEj6HfLdWTTOga8iP0iRM5LGgnijFEAOnEAW5q56D_PxgakB-8F-x5vJi89WSMHaoUCRx1IkwIjPMWXZiHqXZ-Iofg7WoFOmT0uBrG0Fabxxd_-8QSo9wX6w_prCfOiP_tXNFu5BEzxrVemSG2MrYQD3I7rPF-H87sNH_fqF_NBDFuuXbEllgEGnVbYTRS_gsyvn_BOmQZHzSR3whTDl_DSTyqXOGDrS15s4sYCS'
    },
    {
      name: 'Hilda Okafor',
      role: 'UX Strategist & Product Design Lead',
      email: 'hildaokafor1@gmail.com',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8qjffL4e3H5ICF1PIxnjaO-_HUBV3oDOMbPKgP7JI1Z6OeBBfr-wMh_j-1EsvHRVJJ78uJxTT5Et884pZYfEYQcrTPbRXJfyupl8_42Ib18iUqpMEBtIcQ8dcZ41mhli5_s5cEr0IR_Osa7DfBXNjB2iawpwrcfVZUL127Q6TI5ibhaL-o_4LP6Xopk-a-oyyJEKY_N0YMKFQmJzuD5MFO5oFphnRteWklPf1XQIzWpGmV2I2YRGZJU3kcXPcqAwox8b7t2hIkAVz'
    },
    {
      name: 'Mark Awolola',
      role: 'GIS & Spatial Intelligence Lead',
      email: 'awololamark06@gmail.com',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq6bQrnGzHgmBA5dfgw2ClL4BJm1SsQun-gkaKicxsgqjcU9DREaHG5yybt8xWJVHEqlphQu3MQWWc1bv6nBXXCSAyDsZ9hSHO4ZkyjYMRryYcujf8n1doiyB0IpotI-sfew0eWdRqnJR7CJjg4RjoazDvWR6Xirpg1pqM6Pb07k1MITi4_1cfLg8nwyWtrhrbzmQqCh-h2BOGcYDPcriyfQBS0IhoVYlR3vujl9amhZLOijqDSQ9WluqQe0RA8V3LxMNxzJCrSXtQ'
    },
    {
      name: 'Lucy Isibor',
      role: 'Healthcare Partnerships and Community Lead',
      email: 'isiborlucy00@gmail.com',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYepPio4ZK4ZXq9sxri166EOgJY3Np3ha0we3gfIiQ74gDReKReA2oj0EdUGmHFLDLBTCtnKiujXLP9f3Q4weZnSxuXfaY4OKpKoS-ttUVsWsU6RzbLydRQCsTF1HET_E3djKq7iOKNrbIAUfhVtu7feMntEUFwCrZ7Z2QUXxvM5Gm7G0tmFYxIW4RVlFXomOkq94slgciQ-n-JQsw21HT46WltYVUc8rTlaFr6L9va6fkEaB7Z0tv--WHvnoZZOMds_dzF_U1aWUS'
    }
  ];

  return (
    <section id="team" className="py-20 bg-[#101415] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Our Story Block */}
        <div className="max-w-4xl mx-auto mb-24 bg-[#142236]/30 border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00D4FF]/5 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00C782]/5 blur-3xl rounded-full"></div>
          
          <div className="relative z-10 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[#00D4FF] font-mono text-xs uppercase tracking-wider block">Origins</span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight leading-tight">Our Story — How Tinder Health Began</h3>
              <p className="text-gray-400 font-sans text-sm md:text-base">Five strangers. One week. One problem worth solving.</p>
            </div>

            <div className="space-y-4 text-gray-300 font-sans text-sm md:text-base leading-relaxed border-t border-white/10 pt-6">
              <p className="font-semibold text-[#00C782] text-sm md:text-base italic leading-relaxed">
                "In November 2025, Lilian, Hilda, Mark, Musa, and Lucy walked into the first ever Digital for Youth-Led Enterprise (DYLE) program, selected from 18,000 applicants, led by UNDP Nigeria in collaboration with UNDP's Digital Capacity Lab. They arrived as individuals from different backgrounds and left as the Iron Rhinos — and with the foundations of Tinder Health."
              </p>
              
              <p>
                The workshop challenged participants to approach problems through empathy before technology. Using Design Thinking, problem definition, real user validation, rapid prototyping, distribution over perfection, and pitch development, the team created <span className="text-white font-semibold">Simi</span> — a 35-year-old caterer in Kaduna, balancing family life and a small business while navigating serious illness. Simi wasn't fictional. She was every Nigerian struggling to find care that was findable, reliable, and fair.
              </p>

              <p className="text-[#00D4FF] font-medium">
                Tinder Health isn't just an app. It is the promise that no one has to play hide-and-seek with their health. Built by five strangers who became a team, because some problems are too big to walk away from.
              </p>
            </div>
          </div>
        </div>

        {/* Headings */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 font-mono text-xs uppercase tracking-widest">
            The Founders
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Meet the Team
          </h2>
        </div>

        {/* Horizontal grid list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {members.map((member, idx) => (
            <div
              key={member.name}
              className="bg-[#142236]/30 border border-white/5 rounded-2xl p-5 hover:border-[#00D4FF]/20 hover:bg-[#142236]/40 transition-all duration-300 text-center flex flex-col justify-between group relative"
              id={`team-member-${idx}`}
            >
              <div className="space-y-4">
                {/* Photo */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto border-2 border-white/5 group-hover:border-[#00D4FF]/40 transition-all">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-sans font-bold text-white tracking-tight group-hover:text-[#00D4FF] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[10px] font-mono text-[#00C782] uppercase tracking-wider font-semibold">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Card Footer email link */}
              <div className="pt-4 mt-4 border-t border-white/5 flex justify-center text-gray-500 group-hover:text-gray-400 transition-colors">
                <a 
                  href={`mailto:${member.email}`}
                  title={`Email ${member.name} (${member.email})`}
                  className="hover:text-[#227aba] transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
