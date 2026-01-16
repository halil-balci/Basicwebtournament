import { useState, useEffect } from 'react';
import { TournamentList } from '@/app/components/TournamentList';
import { CreateTournamentDialog } from '@/app/components/CreateTournamentDialog';
import { TournamentView } from '@/app/components/TournamentView';
import { TournamentBracket, Match } from '@/app/components/TournamentBracket';
import { LeagueTable, Standing, LeagueMatch } from '@/app/components/LeagueTable';
import { ScoreEntryDialog } from '@/app/components/ScoreEntryDialog';
import { AdminLoginDialog } from '@/app/components/AdminLoginDialog';
import { toast, Toaster } from 'sonner';

interface Tournament {
  id: string;
  name: string;
  format: 'bracket' | 'league';
  teams: string[];
  adminCode: string;
  createdAt: string;
  matches: Match[] | LeagueMatch[];
  standings?: Standing[];
  status: 'ongoing' | 'finished';
}

export default function App() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [scoreDialogOpen, setScoreDialogOpen] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | LeagueMatch | null>(null);
  const [adminSessions, setAdminSessions] = useState<{ [key: string]: boolean }>({});

  // Load tournaments from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('fc26_tournaments');
    if (stored) {
      try {
        setTournaments(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load tournaments', e);
      }
    }
  }, []);

  // Save tournaments to localStorage
  useEffect(() => {
    if (tournaments.length > 0) {
      localStorage.setItem('fc26_tournaments', JSON.stringify(tournaments));
    }
  }, [tournaments]);

  const createBracketMatches = (teams: string[]): Match[] => {
    const matches: Match[] = [];
    const numTeams = teams.length;
    const rounds = Math.ceil(Math.log2(numTeams));
    const nextPowerOf2 = Math.pow(2, rounds);
    
    // First round - only create matches that have at least one team
    const firstRoundMatches = Math.ceil(numTeams / 2);
    
    for (let i = 0; i < firstRoundMatches; i++) {
      const team1Index = i * 2;
      const team2Index = i * 2 + 1;
      
      matches.push({
        id: `match-0-${i}`,
        team1: teams[team1Index] || '',
        team2: teams[team2Index] || '',
        score1: null,
        score2: null,
        round: 0,
        matchIndex: i,
        winner: null,
      });
    }

    // Subsequent rounds - create empty matches
    for (let round = 1; round < rounds; round++) {
      const roundMatches = Math.pow(2, rounds - round - 1);
      for (let i = 0; i < roundMatches; i++) {
        matches.push({
          id: `match-${round}-${i}`,
          team1: '',
          team2: '',
          score1: null,
          score2: null,
          round,
          matchIndex: i,
          winner: null,
        });
      }
    }
    
    // Auto-advance teams with byes in first round
    matches.forEach(match => {
      if (match.round === 0 && match.team1 && !match.team2) {
        // This team has a bye, auto-advance to next round
        const nextRound = match.round + 1;
        const nextMatchIndex = Math.floor(match.matchIndex / 2);
        const nextMatch = matches.find(m => m.round === nextRound && m.matchIndex === nextMatchIndex);
        
        if (nextMatch) {
          const isFirstSlot = match.matchIndex % 2 === 0;
          if (isFirstSlot) {
            nextMatch.team1 = match.team1;
          } else {
            nextMatch.team2 = match.team1;
          }
        }
      }
    });

    return matches;
  };

  const createLeagueMatches = (teams: string[]): LeagueMatch[] => {
    const matches: LeagueMatch[] = [];
    let matchId = 0;
    
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          id: `match-${matchId++}`,
          team1: teams[i],
          team2: teams[j],
          score1: null,
          score2: null,
        });
      }
    }
    
    return matches;
  };

  const createLeagueStandings = (teams: string[]): Standing[] => {
    return teams.map(team => ({
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    }));
  };

  const handleCreateTournament = (data: { name: string; format: 'bracket' | 'league'; teams: string[]; adminCode: string }) => {
    const newTournament: Tournament = {
      id: Date.now().toString(),
      name: data.name,
      format: data.format,
      teams: data.teams,
      adminCode: data.adminCode,
      createdAt: new Date().toISOString(),
      matches: data.format === 'bracket' ? createBracketMatches(data.teams) : createLeagueMatches(data.teams),
      standings: data.format === 'league' ? createLeagueStandings(data.teams) : undefined,
      status: 'ongoing',
    };

    setTournaments([...tournaments, newTournament]);
    toast.success('Turnuva başarıyla oluşturuldu!');
  };

  const updateBracketMatches = (matches: Match[], updatedMatch: Match): Match[] => {
    const newMatches = matches.map(m => 
      m.id === updatedMatch.id ? updatedMatch : m
    );

    // Determine winner
    let winner: string | null = null;
    if (updatedMatch.score1 !== null && updatedMatch.score2 !== null) {
      if (updatedMatch.score1 > updatedMatch.score2) {
        winner = updatedMatch.team1;
      } else if (updatedMatch.score2 > updatedMatch.score1) {
        winner = updatedMatch.team2;
      }
      
      const updatedMatchWithWinner = { ...updatedMatch, winner };
      newMatches[newMatches.findIndex(m => m.id === updatedMatch.id)] = updatedMatchWithWinner;

      // Advance winner to next round
      if (winner) {
        const nextRound = updatedMatch.round + 1;
        const nextMatchIndex = Math.floor(updatedMatch.matchIndex / 2);
        const nextMatch = newMatches.find(m => m.round === nextRound && m.matchIndex === nextMatchIndex);
        
        if (nextMatch) {
          const isFirstSlot = updatedMatch.matchIndex % 2 === 0;
          if (isFirstSlot) {
            nextMatch.team1 = winner;
          } else {
            nextMatch.team2 = winner;
          }
        }
      }
    }

    return newMatches;
  };

  const updateLeagueStandings = (teams: string[], matches: LeagueMatch[]): Standing[] => {
    const standings: { [key: string]: Standing } = {};
    
    teams.forEach(team => {
      standings[team] = {
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    });

    matches.forEach(match => {
      if (match.score1 !== null && match.score2 !== null) {
        standings[match.team1].played++;
        standings[match.team2].played++;
        standings[match.team1].goalsFor += match.score1;
        standings[match.team1].goalsAgainst += match.score2;
        standings[match.team2].goalsFor += match.score2;
        standings[match.team2].goalsAgainst += match.score1;

        if (match.score1 > match.score2) {
          standings[match.team1].won++;
          standings[match.team1].points += 3;
          standings[match.team2].lost++;
        } else if (match.score2 > match.score1) {
          standings[match.team2].won++;
          standings[match.team2].points += 3;
          standings[match.team1].lost++;
        } else {
          standings[match.team1].drawn++;
          standings[match.team2].drawn++;
          standings[match.team1].points += 1;
          standings[match.team2].points += 1;
        }

        standings[match.team1].goalDifference = standings[match.team1].goalsFor - standings[match.team1].goalsAgainst;
        standings[match.team2].goalDifference = standings[match.team2].goalsFor - standings[match.team2].goalsAgainst;
      }
    });

    return Object.values(standings);
  };

  const handleSaveScore = (matchId: string, score1: number, score2: number) => {
    setTournaments(tournaments.map(t => {
      if (t.id === selectedTournamentId) {
        const updatedMatch = t.matches.find(m => m.id === matchId);
        if (updatedMatch) {
          updatedMatch.score1 = score1;
          updatedMatch.score2 = score2;

          if (t.format === 'bracket') {
            const updatedMatches = updateBracketMatches(t.matches as Match[], updatedMatch as Match);
            // Check if tournament is finished
            const finalMatch = updatedMatches.find(m => m.round === Math.max(...updatedMatches.map(m => m.round)));
            const isFinished = finalMatch && finalMatch.score1 !== null && finalMatch.score2 !== null;
            return { ...t, matches: updatedMatches, status: isFinished ? 'finished' : 'ongoing' };
          } else {
            const updatedMatches = t.matches.map(m => 
              m.id === matchId ? updatedMatch : m
            ) as LeagueMatch[];
            const updatedStandings = updateLeagueStandings(t.teams, updatedMatches);
            // Check if all matches are played
            const isFinished = updatedMatches.every(m => m.score1 !== null && m.score2 !== null);
            return { ...t, matches: updatedMatches, standings: updatedStandings, status: isFinished ? 'finished' : 'ongoing' };
          }
        }
      }
      return t;
    }));
    
    toast.success('Skor başarıyla kaydedildi!');
  };

  const handleAdminLogin = (code: string) => {
    const tournament = tournaments.find(t => t.id === selectedTournamentId);
    if (tournament && tournament.adminCode === code) {
      setAdminSessions({ ...adminSessions, [selectedTournamentId!]: true });
      setAdminDialogOpen(false);
      toast.success('Yönetici girişi başarılı!');
    } else {
      toast.error('Yanlış yönetici kodu!');
    }
  };

  const handleAdminLogout = () => {
    setAdminSessions({ ...adminSessions, [selectedTournamentId!]: false });
    toast.info('Yönetici modundan çıkıldı');
  };

  const selectedTournament = tournaments.find(t => t.id === selectedTournamentId);
  const isAdmin = selectedTournamentId ? adminSessions[selectedTournamentId] || false : false;

  if (selectedTournament) {
    return (
      <>
        <TournamentView
          tournament={selectedTournament}
          onBack={() => setSelectedTournamentId(null)}
          isAdmin={isAdmin}
          onAdminLogin={() => setAdminDialogOpen(true)}
          onAdminLogout={handleAdminLogout}
        >
          {selectedTournament.format === 'bracket' ? (
            <TournamentBracket
              matches={selectedTournament.matches as Match[]}
              onEditMatch={(match) => {
                setCurrentMatch(match);
                setScoreDialogOpen(true);
              }}
              isAdmin={isAdmin}
            />
          ) : (
            <LeagueTable
              standings={selectedTournament.standings || []}
              matches={selectedTournament.matches as LeagueMatch[]}
              onEditMatch={(match) => {
                setCurrentMatch(match);
                setScoreDialogOpen(true);
              }}
              isAdmin={isAdmin}
            />
          )}
        </TournamentView>

        <ScoreEntryDialog
          open={scoreDialogOpen}
          onClose={() => {
            setScoreDialogOpen(false);
            setCurrentMatch(null);
          }}
          match={currentMatch}
          onSaveScore={handleSaveScore}
        />

        <AdminLoginDialog
          open={adminDialogOpen}
          onClose={() => setAdminDialogOpen(false)}
          onLogin={handleAdminLogin}
        />

        <Toaster position="top-right" theme="dark" />
      </>
    );
  }

  return (
    <>
      <TournamentList
        tournaments={tournaments}
        onSelectTournament={setSelectedTournamentId}
        onCreateTournament={() => setCreateDialogOpen(true)}
      />

      <CreateTournamentDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreateTournament={handleCreateTournament}
      />

      <Toaster position="top-right" theme="dark" />
    </>
  );
}