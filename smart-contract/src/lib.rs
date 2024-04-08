use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct ExecutionAccount {
    /// number of executions
    pub counter: u32,
}

/// Define the type of state stored in HealthData
#[derive(BorshSerialize, BorshDeserialize, Debug)]
struct HealthData {
    id: String,
    blood_oxygen: u8,
    pulse: u8,
}

/// Define execution params
#[derive(BorshSerialize, BorshDeserialize, Debug)]
struct ContractOperation {
    operation_type: String,
    health_data_list: Vec<HealthData>,
}

impl ContractOperation {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (&tag, rest) = input
            .split_first()
            .ok_or(ProgramError::InvalidInstructionData)?;
    }
}

// Define the DataStore struct as a list of HealthData instances
#[derive(BorshSerialize, BorshDeserialize, Debug)]
struct DataStore {
    health_data_list: Vec<HealthData>,
}

impl DataStore {
    // Implement methods to interact with the DataStore
    // For example, adding new health data or retrieving existing health data
    fn add_health_data(&mut self, health_data: HealthData) {
        self.health_data_list.push(health_data);
    }

    fn get_health_data(&self, id: &str) -> Option<&HealthData> {
        for health_data in &self.health_data_list {
            if health_data.id == id.to_string() {
                return Some(health_data);
            }
        }

        return None;
    }
}

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Rust program entrypoint");

    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    //  The account must be owned by the program in order to modify its data
    // if account.id != program_id {
    //     msg!("Executed account does not have the correct program id");
    //     return Err(ProgramError::IncorrectProgramId);
    // }

    let instruction = ContractOperation::unpack(instruction_data)?;

    // let instruction = ContractOperation::unpack(instruction_data)?;

    // execution_account_data.value = calculator_instructions.evaluate(calc.value);

    // calc.serialize(&mut &mut account.data.borrow_mut()[..])?;
    // msg!("Value is now: {}", calc.value);

    // msg!("Data {}", contract_operation.operation_type);

    // Increment and store the number of times the account has been greeted
    // let mut execution_account = ExecutionAccount::try_from_slice(&account.data.borrow())?;
    // execution_account.counter += 1;
    // execution_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Operation successfully executed! ");

    Ok(())
}
