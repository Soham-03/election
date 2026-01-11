
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Candidate {
  id: number;
  name: string;
  symbol?: string;
}

interface Section {
  id: number;
  color: string;
  candidates: Candidate[];
  selected: number | null;
}

export default function VotingSimulator() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      color: 'bg-white',
      candidates: [
        { id: 1, name: '' },
        { id: 2, name: '' },
        { id: 3, name: 'श्वेता राजू जाधव', symbol: 'shivsena.png' },
        { id: 4, name: '' },
        { id: 5, name: '' },
        { id: 6, name: '' },
        { id: 7, name: '' },
        { id: 8, name: '' },
        { id: 9, name: '' },
        { id: 10, name: 'नोटा (NOTA)' },
      ],
      selected: null,
    },
    {
      id: 2,
      color: 'bg-pink-100',
      candidates: [
        { id: 1, name: 'सौ. इंदिरा पांडुरंग तारे', symbol: 'bjp.png' },
        { id: 2, name: '' },
        { id: 3, name: '' },
        { id: 4, name: 'नोटा (NOTA)' },
      ],
      selected: null,
    },
    {
      id: 3,
      color: 'bg-yellow-100',
      candidates: [
        { id: 1, name: '' },
        { id: 2, name: 'प्रणाली विजय जोशी', symbol: 'bjp.png' },
        { id: 3, name: '' },
        { id: 4, name: '' },
        { id: 5, name: '' },
        { id: 6, name: '' },
        { id: 7, name: 'नोटा (NOTA)' },
      ],
      selected: null,
    },
    {
      id: 4,
      color: 'bg-sky-100',
      candidates: [
        { id: 1, name: '' },
        { id: 2, name: 'कैलास लक्ष्मण जोशी', symbol: 'shivsena.png' },
        { id: 3, name: '' },
        { id: 4, name: '' },
        { id: 5, name: '' },
        { id: 6, name: '' },
        { id: 7, name: '' },
        { id: 8, name: '' },
        { id: 9, name: 'नोटा (NOTA)' },
      ],
      selected: null,
    },
  ]);

  const [lightAnimation, setLightAnimation] = useState<{[key: string]: boolean}>({});
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const handleVote = (sectionId: number, candidateId: number) => {
    // Immediately turn all buttons gray by setting selection
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, selected: candidateId }
          : section
      )
    );

    // Create the light animation key
    const lightKey = `${sectionId}-${candidateId}`;

    // Turn on the light animation
    setLightAnimation(prev => ({ ...prev, [lightKey]: true }));

    // After 2 seconds, turn off the light animation
    setTimeout(() => {
      setLightAnimation(prev => ({ ...prev, [lightKey]: false }));
    }, 2000);
  };

  // Check if all sections have been voted
  useEffect(() => {
    const allVoted = sections.every(section => section.selected !== null);
    if (allVoted) {
      // Show completion dialog after a short delay
      setTimeout(() => {
        setShowCompletionDialog(true);
      }, 500);
    }
  }, [sections]);

  const handleReset = () => {
    setSections(prev => prev.map(section => ({ ...section, selected: null })));
    setLightAnimation({});
    setShowCompletionDialog(false);
  };

  const totalVotes = sections.reduce((acc, section) => {
    return section.selected !== null ? acc + 1 : acc;
  }, 0);

  const getSectionLabel = (index: number) => {
    const labels = ['विभाग १:', 'विभाग २:', 'विभाग ३:', 'विभाग ४:'];
    return labels[index];
  };

  const getVotingStatus = (index: number) => {
    const section = sections[index];
    return section.selected !== null ? '1/1' : '0/1';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <button className="text-gray-600 mb-6 text-lg">← मुख्यपृष्ठ (Home)</button>

          {/* Party Logos */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <div className="w-24 h-24 relative">
              <Image
                src="/bjp.png"
                alt="BJP Logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
            <div className="w-24 h-24 relative">
              <Image
                src="/shivsena.png"
                alt="Shivsena Logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-3 text-black">
            BJP - Shivsena - KDMC Election - Ward No.16
          </h1>
          <p className="text-gray-600 mb-5 text-xl">Voting Simulator</p>
          <button className="px-8 py-3 bg-blue-100 text-blue-700 rounded-full text-lg font-medium">
            एकूण मतं: १२ (Total Votes: 12)
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow p-8 mb-8 text-black">
          <p className="text-center mb-3 text-lg">
            कमळ आणि धनुष्य बाण या चिन्हासमोरील बटन दाबत प्रचंड बहुमताची विजयी करा
          </p>
          <p className="text-center text-gray-600 text-base mb-2">
            प्रत्येक रंगाच्या विभागात १ उमेदवार निवडा आणि मतदान पूर्ण करा.
          </p>
          <p className="text-center text-gray-600 text-base">
            Select 1 candidate in each colored section to complete voting.
          </p>
        </div>

        {/* Section Status */}
        <div className="flex justify-center gap-5 mb-8 flex-wrap text-black">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`px-6 py-3 rounded text-base font-medium ${
                section.selected !== null
                  ? 'bg-white border-2 border-gray-300'
                  : index === 1
                  ? 'bg-pink-100'
                  : index === 2
                  ? 'bg-yellow-100'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              <span>
                {getSectionLabel(index)} {getVotingStatus(index)}
              </span>
            </div>
          ))}
        </div>

        {/* Voting Sections */}
        <div className="bg-white rounded-lg shadow overflow-hidden max-w-3xl mx-auto text-black">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 bg-gray-100">
                <th className="text-left py-2 px-3 font-bold text-base w-12">क्र.</th>
                <th className="text-left py-2 px-3 font-bold text-base">उमेदवाराचे नाव</th>
                <th className="text-center py-2 px-2 font-bold text-base w-16">चिन्ह</th>
                <th className="text-center py-2 px-2 font-bold text-base w-12">दिवा</th>
                <th className="text-center py-2 px-3 font-bold text-base w-40">मतदान</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                section.candidates.map((candidate, candidateIndex) => {
                  const isNota = candidate.name.includes('नोटा');
                  const isSelected = section.selected === candidate.id;
                  const hasName = candidate.name !== '';
                  const sectionHasSelection = section.selected !== null;
                  const lightKey = `${section.id}-${candidate.id}`;
                  const isLightAnimating = lightAnimation[lightKey];

                  return (
                    <tr
                      key={`${section.id}-${candidate.id}`}
                      className={`border-b ${section.color} ${
                        isNota ? 'bg-gray-200' : ''
                      }`}
                    >
                      <td className="py-2 px-3 text-base">
                        {!isNota && candidateIndex + 1}
                      </td>
                      <td className="py-2 px-3">
                        <span className="font-medium text-base">{candidate.name}</span>
                      </td>
                      <td className="text-center py-2 px-2">
                        {candidate.symbol && !isNota && (
                          <div className="inline-flex items-center justify-center w-12 h-12 border border-gray-400 rounded bg-white">
                            <Image
                              src={`/${candidate.symbol}`}
                              alt="Party Symbol"
                              width={36}
                              height={36}
                              className="object-contain"
                            />
                          </div>
                        )}
                      </td>
                      <td className="text-center py-2 px-2">
                        <div className="relative inline-flex items-center justify-center">
                          {isLightAnimating && (
                            <div className="absolute w-8 h-8 bg-red-400 rounded-full opacity-50 animate-ping"></div>
                          )}
                          <div
                            className={`relative inline-block w-5 h-5 rounded-full transition-all duration-300 ${
                              isLightAnimating 
                                ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' 
                                : isSelected 
                                ? 'bg-red-500' 
                                : 'bg-red-900'
                            }`}
                          ></div>
                        </div>
                      </td>
                      <td className="text-center py-2 px-4">
                        <button
                          onClick={() => handleVote(section.id, candidate.id)}
                          disabled={sectionHasSelection}
                          className={`w-24 h-8 px-6 rounded-full  transition-colors text-sm flex items-center justify-center mx-auto ${
                            sectionHasSelection
                              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                              : 'bg-blue-900 text-white hover:bg-blue-800'
                          }`}
                        >
                          {hasName && !isNota ? 'मत द्या' : ''}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ))}
            </tbody>
          </table>
        </div>

        {/* Share Button */}
        <div className="text-center mt-10">
          <button className="px-8 py-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center mx-auto gap-3 text-lg">
            <span className="text-2xl">📱</span>
            <span>WhatsApp वर शेअर करा</span>
          </button>
          <p className="text-gray-500 text-base mt-5">
            हा एक मतदान प्रशिक्षण साधन आहे. | This is a voting training simulator.
          </p>
        </div>
      </div>

      {/* Completion Dialog */}
      {showCompletionDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 text-center animate-fade-in">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Voting Completed
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-700 mb-2 font-medium">
              आपले मतदान यशस्वीरीत्या पूर्ण झाले.
            </p>
            <p className="text-base text-gray-500 mb-8">
              Your voting process is completed.
            </p>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              पुन्हा सुरू करा (Reset)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}